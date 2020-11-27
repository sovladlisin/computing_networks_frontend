import * as React from 'react';
import { useSelector } from 'react-redux';
import { TList } from '../actions/types';
import { RootStore } from '../store';
import { useOnClickOutside } from './HandleClickOutside';

interface ISearchProps {
    onSelect: (l: TList) => void,
    onClose: () => void
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
    const [search, setSearch] = React.useState('')
    const primeState = useSelector((state: RootStore) => state.modelReducer)

    const ref = React.useRef()
    useOnClickOutside(ref, () => { props.onClose() })
    return <div className='search' ref={ref}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Поиск по тексту: '}></input>
        <div className='search-results'>
            {primeState.lists.filter(l => l.text.toLowerCase().includes(search.toLowerCase())).map(l => {
                return <p onClick={() => props.onSelect(l)}>{l.name}</p>
            })}
        </div>
    </div>;
};

export default Search;
