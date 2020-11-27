import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, getPeople, getSystemMarkups, getSystems, getPeopleMarkups, deleteSystemMarkup, deletePeopleMarkup } from '../actions/models';
import { TList, TMarkupPerson, TMarkupSystem, TPerson, TSystem } from '../actions/types';
import { RootStore } from '../store';
import { buildTree } from '../utils';
import AddMarkup from './AddMarkup';
import { useOnClickOutside } from './HandleClickOutside';
import RightPanel from './RightPanel';
import Search from './Search';
import Tree from './tree/Tree';


interface IHomeProps {
}

export type TSE = {
    modelName: number,
    modelId: number
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const dispatch = useDispatch()
    const primeState = useSelector((state: RootStore) => state.modelReducer)

    const [localAuthors, setLocalAuthors] = React.useState<TPerson[]>([])
    const [localSystems, setLocalSystems] = React.useState<TSystem[]>([])

    const [sidePanel, setSidePanel] = React.useState(false)
    const [addMarkup, setAddMarkup] = React.useState(false)
    const [rightPanel, setRightPanel] = React.useState(false)
    const [searchComponent, setSearchComponent] = React.useState(false)

    const [selectedListId, setSelectedListId] = React.useState<number>(null)
    const [selectedList, setSelectedList] = React.useState<TList>(null)

    const [selectedSpans, setSelectedSpans] = React.useState([])

    const [selectedEntity, setSelectedEntity] = React.useState<TSE>()

    const ctrl = useKeyPress('Control')

    const [selectedHtmlElements, setSelectedHtmlElements] = React.useState(null)
    React.useEffect(() => {
        dispatch(getLists())
        dispatch(getPeople())
        dispatch(getSystems())
        dispatch(getSystemMarkups())
        dispatch(getPeopleMarkups())
    }, [])

    React.useEffect(() => {
        if (selectedList === null) return null
        if (selectedList === undefined) return null
        const people = primeState.peopleMarkups.filter(pm => pm.list === selectedList.id).map(pm => pm.person)
        const systems = primeState.systemMarkups.filter(pm => pm.list === selectedList.id).map(pm => pm.system)

        setLocalSystems(primeState.systems.filter(s => systems.includes(s.id)))
        setLocalAuthors(primeState.people.filter(s => people.includes(s.id)))

    }, [primeState.peopleMarkups, primeState.systemMarkups, selectedList])

    React.useEffect(() => {
        setSelectedList(primeState.lists.find(l => l.id === selectedListId))
        setSelectedSpans([])
    }, [selectedListId])

    React.useEffect(() => { setSelectedSpans([]) }, [selectedList])

    React.useEffect(() => {
        if (selectedList) return null
        setSelectedList(primeState.lists[0])
    }, [primeState.lists])
    const ref = React.useRef()

    useOnClickOutside(ref, () => {
        setSidePanel(false)
    })

    var i = -1
    return <>
        {sidePanel && <div className='side-panel' ref={ref}>
            <div className='main-tree'>
                <Tree tree_data={buildTree(primeState.lists)} onClick={setSelectedListId} />
            </div>
        </div>
        }
        {selectedList && <div className='list-data'>
            <p className='list-name' >{selectedList.master && <i onClick={() => setSelectedListId(selectedList.master)} style={{ cursor: 'pointer' }} className="fas fa-backward"></i>}{selectedList.name}</p>
            {selectedList.text.split('\n').map(text => {
                i += 1
                var k = -1
                if (text.length > 2)
                    return <div className='list-text'>{text.split(' ').map(t => {
                        k += 1;
                        const id = i * 1000 + k
                        var style = { paddingLeft: '', background: '', color: '', cursor: '' }
                        style.paddingLeft = k === 0 ? '30px' : ''
                        style.cursor = ctrl ? 'pointer' : ''
                        style.background = selectedSpans.includes(id) ? '#232d41' : ''
                        style.color = selectedSpans.includes(id) ? 'white' : ''



                        const entity: TMarkupSystem = primeState.systemMarkups.find(sm => sm.start === id && sm.list === selectedList.id)
                        const entity2: TMarkupPerson = primeState.peopleMarkups.find(sm => sm.start === id && sm.list === selectedList.id)
                        var enId = null
                        if (entity) {
                            style.background = '#ff6766'
                            style.color = 'white'
                            style.cursor = 'pointer'
                            enId = entity.id
                        }
                        if (entity2) {
                            style.background = '#1ab188'
                            style.color = 'white'
                            style.cursor = 'pointer'
                            enId = entity2.id
                        }
                        return <span
                            style={style}
                            id={id + ''}
                            onClick={(e) => {
                                if (entity) {
                                    setSelectedEntity({ modelId: entity.system, modelName: 0 })
                                    setRightPanel(true)
                                    return null
                                }
                                if (entity2) {
                                    setSelectedEntity({ modelId: entity2.person, modelName: 1 })
                                    setRightPanel(true)
                                    return null
                                }
                                if (!ctrl) return null
                                if (selectedSpans.includes(id))
                                    setSelectedSpans(selectedSpans.filter(s => s != id))
                                else
                                    setSelectedSpans([...selectedSpans, id])
                            }}
                        >
                            {t}
                            {entity && <button className='delete-en' onClick={() => { dispatch(deleteSystemMarkup(enId)) }}><i className='fas fa-times'></i></button>}
                            {entity2 && <button className='delete-en' onClick={() => { dispatch(deletePeopleMarkup(enId)) }}><i className='fas fa-times'></i></button>}
                        </span>
                    })}</div>
            })}
        </div>}

        {selectedList && primeState.lists.filter(l => l.master === selectedList.id).length > 0 && <>
            <div className='dictionary'>
                <div className='dictionary-title'>{'     Словарь терминов по теме:'}</div>
                {primeState.lists.filter(l => l.master === selectedList.id).map(l => {
                    return <p onClick={() => setSelectedListId(l.id)}>{l.name}</p>
                })}
            </div>
        </>}

        {localAuthors.length > 0 && <div className='local-entities'>
            <div>Сущности "Личность" в тексте:</div>
            {localAuthors.map(a => {
                return <p onClick={() => { setRightPanel(true); setSelectedEntity({ modelId: a.id, modelName: 1 }) }}>{a.name}</p>
            })}
        </div>}
        {localSystems.length > 0 && <div className='local-entities'>
            <div>Сущности "Система" в тексте:</div>
            {localSystems.map(a => {
                return <p onClick={() => { setRightPanel(true); setSelectedEntity({ modelId: a.id, modelName: 0 }) }}>{a.name}</p>
            })}
        </div>}
        {!sidePanel && <button id='open-side-panel' onClick={() => setSidePanel(true)}> <i className='fas fa-tree'></i></button>}
        {addMarkup && <AddMarkup onSelect={() => setSelectedSpans([])} onClose={() => setAddMarkup(false)} listId={selectedList.id} selectedSpans={selectedSpans} ></AddMarkup>}
        {!addMarkup && selectedSpans.length != 0 && <button id='add-markup' onClick={() => setAddMarkup(true)}><i className='fas fa-plus'></i></button>}
        {rightPanel && <RightPanel selectedModel={selectedEntity.modelName} selectedId={selectedEntity.modelId} onClose={() => setRightPanel(false)} onSelect={(l) => setSelectedList(l)}></RightPanel>}
        {!searchComponent && <button onClick={() => setSearchComponent(true)} id='open-search'><i className='fas fa-search'></i></button>}
        {searchComponent && <Search onClose={() => setSearchComponent(false)} onSelect={(l) => setSelectedList(l)}></Search>}
    </>;
};

export default Home;

// Hook
function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = React.useState(false);

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Add event listeners
    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}