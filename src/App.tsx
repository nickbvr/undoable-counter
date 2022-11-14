import { MouseEvent, useState } from 'react';
import './App.css';

interface HistoryT {
    [key: string]: number;
}

const App = () => {
    const [result, setResult] = useState<number>(0);
    const [undo, setUndo] = useState<HistoryT[]>([]);
    const [redo, setRedo] = useState<HistoryT[]>([]);
    const [history, setHistory] = useState<HistoryT[]>([]);

    const handleIncrement = (e: MouseEvent) => {
        const action = parseInt(e.currentTarget.innerHTML);
        setResult(result + action);
        setHistory([...history, { [action]: result + action }]);
        setUndo([...undo, { [action]: result + action }]);
        setRedo([]);
    };

    const handleUndo = () => {
        if (undo.length) {
            const action = +Object.keys(undo[undo.length - 1]);
            setResult(result - action);
            setHistory([...history, { [~action + 1]: result - action }]);
            setRedo([...redo, { [action]: result - action }]);
            undo.pop();
            setUndo([...undo]);
        }
    };

    const handleRedo = () => {
        if (redo.length) {
            const action = +Object.keys(redo[redo.length - 1]);
            setResult(result + action);
            setHistory([...history, { [action]: result + action }]);
            setUndo([...undo, { [action]: result + action }]);
            redo.pop();
            setRedo([...redo]);
        }
    };

    const showHistory = history
        .map((obj: HistoryT, i: number) => {
            const act = +Object.keys(obj);
            const res = +Object.values(obj);
            return (
                <div key={i} className='history-item'>
                    <p className='history-action'>{act}</p>
                    <p className='history-result'>{`(${res - act} -> ${res})`}</p>
                </div>
            );
        })
        .reverse();

    return (
        <div className='App'>
            <h1>Undoable counter</h1>
            <div className='action-buttons'>
                <button onClick={handleUndo} disabled={!undo.length}>
                    Undo
                </button>
                <button onClick={handleRedo} disabled={!redo.length}>
                    Redo
                </button>
            </div>
            <div className='values'>
                <button onClick={handleIncrement}>-100</button>
                <button onClick={handleIncrement}>-10</button>
                <button onClick={handleIncrement}>-1</button>
                <p>{result}</p>
                <button onClick={handleIncrement}>+1</button>
                <button onClick={handleIncrement}>+10</button>
                <button onClick={handleIncrement}>+100</button>
            </div>
            <h2>History</h2>
            <div className='history-wrapper'>{showHistory}</div>
        </div>
    );
};

export default App;
