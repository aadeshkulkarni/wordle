import React from 'react'

function Footer({ onAlphabetClick, onEnter, onBackspace,getColorForAlphabet }) {
    return <footer>
        <div style={{ }}>
            <div className="alphabet-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <button className={`alphabet ${getColorForAlphabet('Q')}`} onClick={() => { onAlphabetClick('Q') }}>Q</button>
                <button className={`alphabet ${getColorForAlphabet('W')}`} onClick={() => { onAlphabetClick('W') }}>W</button>
                <button className={`alphabet ${getColorForAlphabet('E')}`} onClick={() => { onAlphabetClick('E') }}>E</button>
                <button className={`alphabet ${getColorForAlphabet('R')}`} onClick={() => { onAlphabetClick('R') }}>R</button>
                <button className={`alphabet ${getColorForAlphabet('T')}`} onClick={() => { onAlphabetClick('T') }}>T</button>
                <button className={`alphabet ${getColorForAlphabet('Y')}`} onClick={() => { onAlphabetClick('Y') }}>Y</button>
                <button className={`alphabet ${getColorForAlphabet('U')}`} onClick={() => { onAlphabetClick('U') }}>U</button>
                <button className={`alphabet ${getColorForAlphabet('I')}`} onClick={() => { onAlphabetClick('I') }}>I</button>
                <button className={`alphabet ${getColorForAlphabet('O')}`} onClick={() => { onAlphabetClick('O') }}>O</button>
                <button className={`alphabet ${getColorForAlphabet('P')}`} onClick={() => { onAlphabetClick('P') }}>P</button>
            </div>
            <div className="alphabet-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <button className={`alphabet ${getColorForAlphabet('A')}`} onClick={() => { onAlphabetClick('A') }}>A</button>
                <button className={`alphabet ${getColorForAlphabet('S')}`} onClick={() => { onAlphabetClick('S') }}>S</button>
                <button className={`alphabet ${getColorForAlphabet('D')}`} onClick={() => { onAlphabetClick('D') }}>D</button>
                <button className={`alphabet ${getColorForAlphabet('F')}`} onClick={() => { onAlphabetClick('F') }}>F</button>
                <button className={`alphabet ${getColorForAlphabet('G')}`} onClick={() => { onAlphabetClick('G') }}>G</button>
                <button className={`alphabet ${getColorForAlphabet('H')}`} onClick={() => { onAlphabetClick('H') }}>H</button>
                <button className={`alphabet ${getColorForAlphabet('J')}`} onClick={() => { onAlphabetClick('J') }}>J</button>
                <button className={`alphabet ${getColorForAlphabet('K')}`} onClick={() => { onAlphabetClick('K') }}>K</button>
                <button className={`alphabet ${getColorForAlphabet('L')}`} onClick={() => { onAlphabetClick('L') }}>L</button>
            </div>
            <div className="alphabet-box"  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr" }}>
                <button className={`alphabet ${getColorForAlphabet('Z')}`} onClick={() => { onAlphabetClick('Z') }}>Z</button>
                <button className={`alphabet ${getColorForAlphabet('X')}`} onClick={() => { onAlphabetClick('X') }}>X</button>
                <button className={`alphabet ${getColorForAlphabet('C')}`} onClick={() => { onAlphabetClick('C') }}>C</button>
                <button className={`alphabet ${getColorForAlphabet('V')}`} onClick={() => { onAlphabetClick('V') }}>V</button>
                <button className={`alphabet ${getColorForAlphabet('B')}`} onClick={() => { onAlphabetClick('B') }}>B</button>
                <button className={`alphabet ${getColorForAlphabet('N')}`} onClick={() => { onAlphabetClick('N') }}>N</button>
                <button className={`alphabet ${getColorForAlphabet('M')}`} onClick={() => { onAlphabetClick('M') }}>M</button>
                <button className="alphabet" onClick={() => { onBackspace() }}><img src="backspace.svg" style={{ width: "24px", height: "24px" }}/></button>
                <button className="alphabet" onClick={onEnter}><img src="enter.svg" style={{ width: "24px", height: "24px" }}/></button>
            </div>
        </div>
    </footer>
}

export default Footer