import './App.css'
import DraggableComponent from './components/draggable/draggable.component'
import IconComponent from './components/icons/icon.component'
import ModalComponent from './components/modal/modal.component'
import GlobalCenteredSearchComponent from './components/search/global-centered-search.component'
import TaskBarComponent from './components/task-bar/task-bar.component'
import { useApiHook, useTestSubscription } from './hooks/useApi.hook'

function App() {
    const apiHook = useApiHook()
    const sub = useTestSubscription()

    return (
        <>
            <GlobalCenteredSearchComponent />
            <DraggableComponent>
                <IconComponent icon="folder" />
            </DraggableComponent>

            <TaskBarComponent>
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="calendar" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
                <IconComponent icon="folder" />
            </TaskBarComponent>
        </>
    )
}

export default App
