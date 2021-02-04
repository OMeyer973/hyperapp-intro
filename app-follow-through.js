import { h, app, text } from "https://unpkg.com/hyperapp";

// 0 // HELLO WORLD ////////////////////////

// const init = {}

const node = document.getElementById("app");

//const view = () => h("h1", {}, text("hello, world"));
// ==> <h1>hello world</h1>

// const view = () => h("h1", {}, [
//   text("Hello "), 
//   h("strong", {}, text("world"))
// ]);
//==> <h1>hello <strong>world</strong></h1>

// 1 // INITIAL STATIC VIEW ////////////////////////

// view: () => h("div", { id: "app", class: "container" }, [
//   h("div", { class: "filter" }, [
//     text(" Filter: "),
//     h("span", { class: "filter-word" }, text("ocean")),
//     h("button", {}, text("\u270E")),
//   ]),
//   h("div", { class: "stories" }, [
//     h("ul", {}, [
//       h("li", { class: "unread" }, [
//         h("p", { class: "title" }, [
//           text("The "),
//           h("em", {}, text("Ocean")),
//           text(" is Sinking!"),
//         ]),
//         h("p", { class: "author" }, text("Kat Stropher")),
//       ]),
//       h("li", { class: "reading" }, [
//         h("p", { class: "title" }, [
//           h("em", {}, text("Ocean")),
//           text(" life is brutal"),
//         ]),
//         h("p", { class: "author" }, text("Surphy McBrah")),
//       ]),
//       h("li", {}, [
//         h("p", { class: "title" }, [
//           text("Family friendly fun at the "),
//           h("em", {}, text("ocean")),
//           text(" exhibit"),
//         ]),
//         h("p", { class: "author" }, text("Guy Prosales")),
//       ]),
//     ]),
//   ]),
//   h("div", { class: "story" }, [
//     h("h1", {}, text("Ocean life is brutal")),
//     h("p", {}, text(`
//       Lorem ipsum dolor sit amet, consectetur adipiscing
//       elit, sed do eiusmod tempor incididunt ut labore et
//       dolore magna aliqua. Ut enim ad minim veniam, quis
//       nostrud exercitation ullamco laboris nisi ut aliquip
//       ex ea commodo consequat.
//     `)),
//     h("p", { class: "signature" }, text("Surphy McBrah")),
//   ]),
//   h("div", { class: "autoupdate" }, [
//     text("Auto update: "),
//     h("input", { type: "checkbox" }),
//   ]),
// ]),

// 2 // NESTING THE VIEW ////////////////////////

const Container = content =>
  h("div", {class: "container"}, content)

// const Filter = () =>
//   h("div", { class: "filter" }, [
//     text(" Filter: "),
//     h("span", { class: "filter-word" }, text("ocean")),
//     h("button", {}, text("\u270E")),
//   ])
  
// const Projectlist = ({ projects, reading }) =>  
//   h("div", { class: "stories" }, [
//     h("ul", {},
//       Object.keys(projects).map(project => Project({
//         title: projects[project].title,
//         pitch: projects[project].pitch,
//         author: projects[project].author,
//         unread: projects[project].unread,
//         reading: reading === project
//       })))
//   ]);  
  
// const Project = ({ title, pitch, author, unread, reading }) =>
//     h("li", { class: { reading, unread } }, [ // passing boolean as classes resolves the name of the class in function of the boolean
//       h("p", { class: "title" }, text(title)),
//       h("p", { class: "pitch" }, text(pitch)),
//       h("p", { class: "author" }, text(author)), 
//     ]);

// const ProjectContent = () =>
//   h("div", { class: "story" }, [
//     h("h1", {}, text("Ocean life is brutal")),
//     h("p", {}, text(`
//       Lorem ipsum dolor sit amet, consectetur adipiscing
//       elit, sed do eiusmod tempor incididunt ut labore et
//       dolore magna aliqua. Ut enim ad minim veniam, quis
//       nostrud exercitation ullamco laboris nisi ut aliquip
//       ex ea commodo consequat.
//     `)),
//     h("p", { class: "signature" }, text("Surphy McBrah")),
//   ])

const AutoUpdate = () => 
  h("div", { class: "autoupdate" }, [
    text("Auto update: "),
    h("input", { type: "checkbox" }),
  ])


// const view = () => Container([
//   Filter(),
//   Projectlist({
//     "reading": "1",
//     projects: {
//       "1": {
//         "title": "Title 1",
//         "pitch": "pitch 1",
//         "author": "Author 1",
//         "unread": false
//       },
//       "2": {
//         "title": "Title 2",
//         "pitch": "pitch 2",
//         "author": "Author 2",
//         "unread": false
//       }
//     }
//   }),
//   ProjectContent(),
//   AutoUpdate()
// ]);

// 3 // EXTRACTING STATE  ////////////////////////

// const init = {
//   "reading": "1",
//   projects: {
//     "1": {
//       "title": "Title 1",
//       "pitch": "pitch 1",
//       "author": "Author 1",
//       "unread": false
//     },
//     "2": {
//       "title": "Title 2",
//       "pitch": "pitch 2",
//       "author": "Author 2",
//       "unread": false
//     }
//   }
// }

// const view = state => Container([
//   Filter(),
//   Projectlist(state),
//   ProjectContent(),
//   AutoUpdate()
// ]);

// 4 // ADDING FILTER FUNCTION (STATIC) ////////////////////////

// const init = {
//   filter: "1",
//   "reading": "1",
//   projects: {
//     "1": {
//       "title": "Title 1",
//       "pitch": "pitch 1",
//       "author": "Author 1",
//       "unread": false
//     },
//     "2": {
//       "title": "Title 2",
//       "pitch": "pitch 2",
//       "author": "Author 2",
//       "unread": false
//     }
//   }
// }

const emphasize = (word, string) =>
  string.split(" ").map(w => w.toLowerCase() === word.toLowerCase() ? h("strong", {}, text(w)) : text(w));

// const Projectlist = ({ projects, reading, filter }) =>  
//   h("div", { class: "stories" }, [
//     h("ul", {},
//       Object.keys(projects).map(project => Project({
//         filter,
//         title: projects[project].title,
//         pitch: projects[project].pitch,
//         author: projects[project].author,
//         unread: projects[project].unread,
//         reading: reading === project
//     })))  
//   ]);  

// const Project = ({ title, pitch, author, unread, reading, filter }) =>
// h("li", { class: { reading, unread } }, [ // passing boolean as classes resolves the name of the class in function of the boolean
//   h("p", { class: "title" }, emphasize(filter, title)),
//   h("p", { class: "pitch" }, emphasize(filter, pitch)),
//   h("p", { class: "author" }, text(author)), 
// ]);

// const ProjectContent = ({ title, pitch, author }) =>
//   h("div", { class: "story" }, [
//     h("h1", {}, text(title)),
//     h("p", {}, text(pitch)),
//     h("p", { class: "signature" }, text(author)),
//   ])

// const view = state => Container([
//   Filter(),
//   Projectlist(state),
//   ProjectContent(state.projects[state.reading]),
//   AutoUpdate()
// ]);

// 5 // ADDING FILTER ACTION (DYNAMIC) ////////////////////////

// actions: take a state & return a modified state
const StartEditingFilter = state => ({ ...state, editingFilter: true });
// const StoptEditingFilter = state => ({ ...state, editingFilter: false });
const SetFilter = (state, event) => ({ ...state, filter: event.target.value });

const Filter = ({ editingFilter, filter }) =>
h("div", { class: "filter" }, [
  text(" Filter: "),
  editingFilter ?
  h("input", { type: "text", value: filter, oninput: SetFilter }) :
  h("span", { class: "filter-word" }, text(filter)),
  editingFilter ?
  h("button", { onclick: StoptEditingFilter }, text("\u2713")) :
  h("button", { onclick: StartEditingFilter }, text("\u270E"))
])

const view = state => Container([
  Filter(state),
  Projectlist(state),
  ProjectContent(state.projects[state.reading]),
  AutoUpdate()
]);

// 6 // ADDING SELECT PROJECT ACTION ////////////////////////

const SelectProject = (state, id) => ({ ...state, reading: id})

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

// 6 // ADDING FETCH REMOTE PROJECTS EFFECT ////////////////////////

const fetchJsonData = (dispatch, options) =>
  fetch(options.url)
    .then((response) => response.json())
    .then((data) => dispatch(options.onresponse, data))
    .catch(() => dispatch(options.onresponse, {}))

const loader = (searchWord) => [
  fetchJsonData, {
    url: `http://fip.zaiste.net/projects?q=${searchWord}`,
    onresponse: GotProjects
  }
]

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

const init = [
  {
    filter: "1",
    "reading": "1",
    projects: {}
  },
  loader("")
]

const ProjectContent = (props) =>
  h("div", { class: "story" }, props ? [
    h("h1", {}, text(props.title)),
    h("div", { class: "content" }, [
      h("p", {}, text(props.pitch)),
      h("p", { class: "signature" }, text(props.author)),
    ]),
  ] : [])

// 7 // ADDING FILTER LIST EFFECT ////////////////////////

const StoptEditingFilter = state => [
  { ...state, editingFilter: false },
  loader(state.filter.toLowerCase())
];

// END ////////////////////////

app({ init, view, node });