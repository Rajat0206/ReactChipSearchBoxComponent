import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import Trie from '../../Helper/SuggestionsTrie'
import Chip from '../ChipComponent/Chip';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [result, setResult] = useState(null);
  const [words, setWords] = useState(["hello", "dog", "hell", "cat", "a", "hel","help","helps","helping"]);
  const [trie, setTrie] = useState();
  const [selectedChips, setSelectedChips] = useState([]);

  const findResult = (title) => {
    setSelectedChips([...selectedChips, title]);
    trie.delete(title);
    setSuggestions(trie.suggest(value));
  };

  const cross = (title) => {
    const index = selectedChips.indexOf(title);
    if (index > -1) {
      selectedChips.splice(index, 1);
    }

    trie.insert(title);
    setSuggestions(trie.suggest(value));
  }

  useEffect(() => {
    let t = new Trie();
    words.forEach((word) => t.insert(word));
    setTrie(t);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSuggestions(trie.suggest(value));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <>
      <div className={styles.container}>
        {selectedChips.map((valu) => (
          <Chip {...{val: valu, hidden: true, cross}}></Chip>
        ))}
        <input
          onFocus={() => setHideSuggestions(false)}
          onBlur={async () => {
            setTimeout(() => {
              setHideSuggestions(true);
            }, 200);
          }}
          type="text"
          className={styles.textbox}
          placeholder="Search data..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {suggestions.map((suggestion) => (
            <div
              onClick={() => findResult(suggestion)}
            >
              
              <Chip {...{val: suggestion, hidden: false, email: suggestion + "@gmail.com", cross}}></Chip>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;