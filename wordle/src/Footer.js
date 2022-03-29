import React from 'react'

function Footer({ onAlphabetClick, onEnter, onBackspace }) {
    return <footer style={{ position: "absolute", bottom: "2rem", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: "1rem" }}>
                <div className="alphabet" onClick={() => { onAlphabetClick('Q') }}>Q</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('W') }}>W</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('E') }}>E</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('R') }}>R</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('T') }}>T</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('Y') }}>Y</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('U') }}>U</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('I') }}>I</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('O') }}>O</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('P') }}>P</div>
            </div> <hr />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: "1rem" }}>
                <div className="alphabet" onClick={() => { onAlphabetClick('A') }}>A</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('S') }}>S</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('D') }}>D</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('F') }}>F</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('G') }}>G</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('H') }}>H</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('J') }}>J</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('K') }}>K</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('L') }}>L</div>
            </div>
            <hr />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr", gap: "1rem" }}>
                <div className="alphabet" onClick={onEnter}>Enter</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('Z') }}>Z</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('X') }}>X</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('C') }}>C</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('V') }}>V</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('B') }}>B</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('N') }}>N</div>
                <div className="alphabet" onClick={() => { onAlphabetClick('M') }}>M</div>
                <div className="alphabet" onClick={() => { onBackspace() }}>Backspace</div>
            </div>
        </div>
    </footer>
}

export default Footer