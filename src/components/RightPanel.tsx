import * as React from 'react';
import { useSelector } from 'react-redux';
import { TList, TPerson, TSystem } from '../actions/types';
import { RootStore } from '../store';
import { useOnClickOutside } from './HandleClickOutside';

interface IRightPanelProps {
    selectedModel: number,
    selectedId: number,

    onSelect: (l: TList) => void,
    onClose: () => void
}

const RightPanel: React.FunctionComponent<IRightPanelProps> = (props) => {

    const primeState = useSelector((state: RootStore) => state.modelReducer)

    const [entity, setEntity] = React.useState<TPerson | TSystem>(null)
    const [relatedLists, setRelatedLists] = React.useState<TList[]>([])

    const ref = React.useRef()
    useOnClickOutside(ref, () => { props.onClose() })
    React.useEffect(() => {
        if (props.selectedModel === 0)
            setEntity(primeState.systems.find(s => s.id === props.selectedId))
        if (props.selectedModel === 1)
            setEntity(primeState.people.find(s => s.id === props.selectedId))
    }, [props.selectedId])

    React.useEffect(() => {
        if (entity === null || entity === undefined) return null
        if (props.selectedModel === 0) {
            setRelatedLists(primeState.lists.filter(l => primeState.systemMarkups.filter(sm => sm.system === entity.id).map(sm => sm.list).includes(l.id)))
        }
        if (props.selectedModel === 1) {
            setRelatedLists(primeState.lists.filter(l => primeState.peopleMarkups.filter(sm => sm.person === entity.id).map(sm => sm.list).includes(l.id)))
        }
    }, [entity])



    return <>
        <div className='right-panel' ref={ref}>
            <p>Сущность: {props.selectedModel === 0 ? 'Система' : 'Личность'}</p>
            <p>Наименование: {entity && entity.name}</p>
            {/* {entity && props.selectedModel === 0 && <><p>Описание:</p> <div className='en-desc'>{entity.description}</div></>} */}
            <p>Упоминания сущности:</p>
            {relatedLists.length === 0 && <p>Упоминаний нет</p>}
            {relatedLists.length != 0 && relatedLists.map(l => {
                return <>
                    <div className='list-rel-option' onClick={() => { props.onSelect(l) }}>
                        {l.name}
                    </div>
                </>
            })}
        </div>
    </>;
};

export default RightPanel;
