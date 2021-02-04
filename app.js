import { h, app, text } from "https://unpkg.com/hyperapp";

// ACTIONS  ////////////////////////
// actions: take a state & return a modified state

const StartEditingFilter = state => ({ ...state, editingFilter: true });
const SetFilter = (state, event) => ({ ...state, filter: event.target.value });

const SelectProject = (state, id) => ({ ...state, reading: id})

const GotProjects = (state, projects) => ({
  ...state,
  "projects": Object.keys(projects)
    .map((id) => [
      id,
      {
        ...projects[id],
        seen: state.projects[id] && state.projects[id].seen,
      }
    ])
    .reduce((o, [id, story]) => ((o[id] = story), o), {}),
  "reading": projects[state.reading] ? state.reading : null
})

// EFFECTS ////////////////////////

const fetchJsonData = (dispatch, options) =>
  fetch(options.url)
    .then((response) => response.json())
    .then((data) => dispatch(options.onresponse, data))
    .catch(() => dispatch(options.onresponse, {}))

const loader = (searchWord) => [
  fetchJsonData, {
    url: "projects.json",
    // url: `http://fip.zaiste.net/projects?q=${searchWord}`, // disabled to test gh pages deployment (domain not secure) 
    onresponse: GotProjects
  }
]

// COMPONENTS ////////////////////////

const Container = content =>
  h("div", {class: "container"}, content)

const Filter = ({ editingFilter, filter }) =>
  h("div", { class: "filter" }, [
    text(" Filter: "),
    editingFilter ?
    h("input", { type: "text", value: filter, oninput: SetFilter }) :
    h("span", { class: "filter-word" }, text(filter)),
    editingFilter ?
    h("button", { onclick: StoptEditingFilter }, text("\u2713")) :
    h("button", { onclick: StartEditingFilter }, text("\u270E"))
  ]);

const Projectlist = ({ projects, reading, filter }) =>  
  h("div", { class: "stories" }, [
    h("ul", {},
    Object.keys(projects).map(id => Project({
      id,
      filter,
      title: projects[id].title,
      pitch: projects[id].pitch,
      author: projects[id].author,
      unread: projects[id].unread,
      reading: reading === id
    })))  
  ]);

const Project = ({ title, pitch, author, unread, reading, filter, id }) =>
  h("li", { class: { reading, unread }, onclick: [SelectProject, id] }, [
    h("p", { class: "title" }, emphasize(filter, title)),
    h("p", { class: "pitch" }, emphasize(filter, pitch)),
    h("p", { class: "author" }, text(author)), 
  ]);

const ProjectContent = (props) =>
  h("div", { class: "story" }, props ? [
    h("h1", {}, text(props.title)),
    h("div", { class: "content" }, [
      h("p", {}, text(props.pitch)),
      h("p", { class: "signature" }, text(props.author)),
    ]),
  ] : []);

const AutoUpdate = () => 
  h("div", { class: "autoupdate" }, [
    text("Auto update: "),
    h("input", { type: "checkbox" }),
  ]);

const StoptEditingFilter = state => [
    { ...state, editingFilter: false },
    loader(state.filter.toLowerCase())
  ];

  // UTILITIES ////////////////////////

const emphasize = (word, string) =>
string.split(" ").map(w => w.toLowerCase() === word.toLowerCase() ? h("strong", {}, text(w)) : text(w));

// BUILD THE APP ////////////////////////

const init = [
  {
    filter: "1",
    "reading": "1",
    projects: {}
  },
  loader("")
]

const view = state => Container([
  Filter(state),
  Projectlist(state),
  ProjectContent(state.projects[state.reading]),
  AutoUpdate()
]);

const node = document.getElementById("app");

// LAUNCH THE APP ////////////////////////

app({ init, view, node });