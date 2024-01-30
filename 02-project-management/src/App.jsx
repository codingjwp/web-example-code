import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [project, setProject] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProject((prevState) => {
      const maxId = prevState.tasks.length === 0 ? 1 : Math.max(...prevState.tasks.map(item => item.id)) + 1
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: maxId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id) {
    setProject((prevState) => {
      return ({
        ...prevState,
        selectedProjectId: undefined,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      })
    })
  }

  function handleSelectProject(id) {
    setProject((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleStartAddProject() {
    setProject((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }
  function handleCancelAddProject() {
    setProject((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {
    setProject((prevState) => {
      const newProject = {
        ...projectData,
        id: prevState.projects.length === 0 ? 1 : prevState.projects[prevState.projects.length - 1].id + 1
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProject((prevState) => {
      return ({
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((item) => item.id !== prevState.selectedProjectId)
      })
    })
  }

  const selectedProject = project.projects.find(item => item.id === project.selectedProjectId);
  const selectedTask = project.tasks.filter((item) => item.projectId === project.selectedProjectId) ?? [];
  console.log("Test :", selectedTask)
  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={selectedTask}
  />;

  if (project.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (project.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={project.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={project.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
