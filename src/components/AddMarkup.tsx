import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPeopleMarkup, createPerson, createSystem, createSystemMarkup, deletePerson, deleteSystem } from '../actions/models';
import { TMarkupPerson, TMarkupSystem, TPerson, TSystem } from '../actions/types';
import { RootStore } from '../store';
import { useOnClickOutside } from './HandleClickOutside';

interface IAddMarkupProps {
    selectedSpans: number[],
    listId: number,
    onClose: () => void,
    onSelect: () => void
}

const AddMarkup: React.FunctionComponent<IAddMarkupProps> = (props) => {
    const dispatch = useDispatch()
    const primeState = useSelector((state: RootStore) => state.modelReducer)
    const [selectedModel, setSelectedModel] = React.useState(0)
    const [newEntityName, setNewEntityName] = React.useState('')
    const [selectedPerson, setSelectedPerson] = React.useState<TPerson>(null)
    const [selectedSystem, setSelectedSystem] = React.useState<TSystem>(null)

    const ref = React.useRef()
    useOnClickOutside(ref, () => {
        props.onClose()
    })

    const makeConnection = () => {
        if (selectedModel === 0) {
            props.selectedSpans.map(sp => {
                const markup: TMarkupPerson = {
                    start: sp,
                    end: sp,
                    person: selectedPerson.id,
                    list: props.listId,
                }
                dispatch(createPeopleMarkup(markup))
            })
            return null
        }
        props.selectedSpans.map(sp => {
            const markup: TMarkupSystem = {
                start: sp,
                end: sp,
                system: selectedSystem.id,
                list: props.listId
            }
            dispatch(createSystemMarkup(markup))
        })
        props.onSelect()
    }
    return <>
        <div className='add-markup' ref={ref}>
            <select name="" id="" value={selectedModel} onChange={(e) => setSelectedModel(parseInt(e.target.value))}>
                <option value={0}>Автор</option>
                <option value={1}>Система</option>
            </select>
            <div className='listing'>

                {selectedModel === 0 && <>
                    <div className='add'>
                        <input onChange={e => setNewEntityName(e.target.value)} value={newEntityName}></input>
                        <button onClick={_ => dispatch(createPerson({ name: newEntityName }))}><i className='fas fa-plus'></i></button>
                    </div>
                    {primeState.people.map(p => {
                        return <div style={selectedPerson && selectedPerson.id === p.id ? { background: '#232d41', color: 'white' } : {}} className='mark-option' onClick={() => setSelectedPerson(p)}>
                            {p.name}
                            <button onClick={_ => dispatch(deletePerson(p.id))}><i className='fas fa-trash'></i></button>
                        </div>
                    })}
                </>}
                {selectedModel === 1 && <>
                    <div className='add'>
                        <input onChange={e => setNewEntityName(e.target.value)} value={newEntityName}></input>
                        <button onClick={_ => dispatch(createSystem({ name: newEntityName, description: 'Описание' }))}><i className='fas fa-plus'></i></button>
                    </div>
                    {primeState.systems.map(p => {
                        return <div style={selectedSystem && selectedSystem.id === p.id ? { background: '#232d41', color: 'white' } : {}} className='mark-option' onClick={() => setSelectedSystem(p)}>
                            {p.name}
                            <button onClick={_ => dispatch(deleteSystem(p.id))}><i className='fas fa-trash'></i></button>
                        </div>
                    })}
                </>}
            </div>
            <button onClick={makeConnection}>Привязать</button>
        </div>
    </>;
};

export default AddMarkup;
