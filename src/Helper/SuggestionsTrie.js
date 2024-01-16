class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}
    
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
        if (!node.children[word[i]]) {
            node.children[word[i]] = new TrieNode();
        }
        node = node.children[word[i]];
        }
        node.isWord = true;
    }

    delete(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
        if (!node.children[word[i]]) {
            node.children[word[i]] = new TrieNode();
        }
        node = node.children[word[i]];
        }
        node.isWord = false;
    }
    
    suggestHelper(root, list, curr) {
        if (root.isWord) {
        list.push(curr);
        }
        if (!Object.keys(root.children).length) {
        return;
        }
        for (let child in root.children) {
        this.suggestHelper(root.children[child], list, curr + child);
        }
    }
    
    suggest(prefix) {
        let node = this.root;
        let curr = "";
        for (let i = 0; i < prefix.length; i++) {
        if (!node.children[prefix[i]]) {
            return [];
        }
        node = node.children[prefix[i]];
        curr += prefix[i];
        }
        let list = [];
        this.suggestHelper(node, list, curr);
        return list;
    }
}

export default Trie;