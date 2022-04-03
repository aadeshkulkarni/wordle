import React from 'react'

function Footer({ onAlphabetClick, onEnter, onBackspace,getColorForAlphabet }) {
    return <footer>
        <div style={{ }}>
            <div className="alphabet-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <div className={`alphabet ${getColorForAlphabet('Q')}`} onClick={() => { onAlphabetClick('Q') }}>Q</div>
                <div className={`alphabet ${getColorForAlphabet('W')}`} onClick={() => { onAlphabetClick('W') }}>W</div>
                <div className={`alphabet ${getColorForAlphabet('E')}`} onClick={() => { onAlphabetClick('E') }}>E</div>
                <div className={`alphabet ${getColorForAlphabet('R')}`} onClick={() => { onAlphabetClick('R') }}>R</div>
                <div className={`alphabet ${getColorForAlphabet('T')}`} onClick={() => { onAlphabetClick('T') }}>T</div>
                <div className={`alphabet ${getColorForAlphabet('Y')}`} onClick={() => { onAlphabetClick('Y') }}>Y</div>
                <div className={`alphabet ${getColorForAlphabet('U')}`} onClick={() => { onAlphabetClick('U') }}>U</div>
                <div className={`alphabet ${getColorForAlphabet('I')}`} onClick={() => { onAlphabetClick('I') }}>I</div>
                <div className={`alphabet ${getColorForAlphabet('O')}`} onClick={() => { onAlphabetClick('O') }}>O</div>
                <div className={`alphabet ${getColorForAlphabet('P')}`} onClick={() => { onAlphabetClick('P') }}>P</div>
            </div>
            <div className="alphabet-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"}}>
                <div className={`alphabet ${getColorForAlphabet('A')}`} onClick={() => { onAlphabetClick('A') }}>A</div>
                <div className={`alphabet ${getColorForAlphabet('S')}`} onClick={() => { onAlphabetClick('S') }}>S</div>
                <div className={`alphabet ${getColorForAlphabet('D')}`} onClick={() => { onAlphabetClick('D') }}>D</div>
                <div className={`alphabet ${getColorForAlphabet('F')}`} onClick={() => { onAlphabetClick('F') }}>F</div>
                <div className={`alphabet ${getColorForAlphabet('G')}`} onClick={() => { onAlphabetClick('G') }}>G</div>
                <div className={`alphabet ${getColorForAlphabet('H')}`} onClick={() => { onAlphabetClick('H') }}>H</div>
                <div className={`alphabet ${getColorForAlphabet('J')}`} onClick={() => { onAlphabetClick('J') }}>J</div>
                <div className={`alphabet ${getColorForAlphabet('K')}`} onClick={() => { onAlphabetClick('K') }}>K</div>
                <div className={`alphabet ${getColorForAlphabet('L')}`} onClick={() => { onAlphabetClick('L') }}>L</div>
            </div>
            <div className="alphabet-box"  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr 2fr" }}>
                <div className={`alphabet ${getColorForAlphabet('Z')}`} onClick={() => { onAlphabetClick('Z') }}>Z</div>
                <div className={`alphabet ${getColorForAlphabet('X')}`} onClick={() => { onAlphabetClick('X') }}>X</div>
                <div className={`alphabet ${getColorForAlphabet('C')}`} onClick={() => { onAlphabetClick('C') }}>C</div>
                <div className={`alphabet ${getColorForAlphabet('V')}`} onClick={() => { onAlphabetClick('V') }}>V</div>
                <div className={`alphabet ${getColorForAlphabet('B')}`} onClick={() => { onAlphabetClick('B') }}>B</div>
                <div className={`alphabet ${getColorForAlphabet('N')}`} onClick={() => { onAlphabetClick('N') }}>N</div>
                <div className={`alphabet ${getColorForAlphabet('M')}`} onClick={() => { onAlphabetClick('M') }}>M</div>
                <div className="alphabet" onClick={() => { onBackspace() }}><img src="backspace.svg" style={{ width: "24px", height: "24px" }}/></div>
                <div className="alphabet" onClick={onEnter}><img src="enter.svg" style={{ width: "24px", height: "24px" }}/></div>
            </div>
        </div>
    </footer>
}

export default Footer