import React from 'react'


export default function Category({ onCategorySelectHandler, categories }) {
    return (
        categories ? categories.length > 0 && <>
            <div className="category_container">
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[0]}>
                    <img src={`/${categories[0]}.svg`} alt={categories[0]} data-category-name={categories[0]} />
                    <span data-category-name={categories[0]}>{categories[0]?.toUpperCase()}</span>
                </div>
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[1]}>
                    <img src={`/${categories[1]}.svg`} alt={categories[1]} data-category-name={categories[1]} />
                    <span data-category-name={categories[1]}>{categories[1]?.toUpperCase()}</span>
                </div>
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[2]}>
                    <img src={`/${categories[2]}.svg`} alt={categories[2]} data-category-name={categories[2]} />
                    <span data-category-name={categories[2]}>{categories[2]}</span>
                </div>
           
           
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[3]}>
                    <img src={`/${categories[3]}.svg`} alt={categories[3]} data-category-name={categories[3]} />
                    <span data-category-name={categories[3]}>{categories[3]?.toUpperCase()}</span>
                </div>
                <div className="category_item" id="our-categories" style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#0d293e" }}>
                    <p>OUR <br /> <span style={{ fontWeight: 700 }}>CATEGORIES</span></p>
                </div>
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[4]}>
                    <img src={`/${categories[4]}.svg`} alt={categories[4]} data-category-name={categories[4]} />
                    <span data-category-name={categories[4]}>{categories[4]?.toUpperCase()}</span>
                </div>
            
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[5]}>
                    <img src={`/${categories[5]}.svg`} alt={categories[5]} data-category-name={categories[5]} />
                    <span data-category-name={categories[5]}>{categories[5]?.toUpperCase()}</span>
                </div>
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[6]}>
                    <img src={`/${categories[6]}.svg`} alt={categories[6]} data-category-name={categories[6]} />
                    <span data-category-name={categories[6]}>{categories[6]?.toUpperCase()}</span>
                </div>
                <div className="category_item" onClick={onCategorySelectHandler} data-category-name={categories[7]}>
                    <img src={`/${categories[7]}.svg`} alt={categories[7]} data-category-name={categories[7]} />
                    <span data-category-name={categories[7]}>{categories[7]?.toUpperCase()}</span>
                </div>
            </div>
        </> : <div>Loading</div>
    )
}
