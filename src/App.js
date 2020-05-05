import React, {Component} from 'react';
import {Input} from "semantic-ui-react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import _ from "underscore";

_.mixin(require('underscore.deepclone'));

const MenuItems = [
    {
        showCheckbox: false,
        value: "Bacon & Eggs",
        label: "Bacon & Eggs",
        children: [
            {
                showCheckbox: false,
                value: "Bacon",
                label: "Bacon",
                children: [
                    {
                        showCheckbox: false,
                        value: "Meat",
                        label: "Meat",
                        children: [
                            {
                                showCheckbox: false,
                                value: "Pork",
                                label: "Pork"
                            }
                        ]
                    }
                ]
            },
            {
                showCheckbox: false,
                value: "Ham Eggs",
                label: "Ham Eggs",
                children: [
                    {
                        showCheckbox: false,
                        value: "Egg",
                        label: "Egg"
                    }
                ]
            }
        ]
    },
    {
        showCheckbox: false,
        value: "Hamburger",
        label: "Hamburger",
        children: [
            {
                showCheckbox: false,
                value: "Meat",
                label: "Meat",
                children: [
                    {
                        showCheckbox: false,
                        value: "Pork",
                        label: "Pork"
                    }
                ]
            },
            {
                showCheckbox: false,
                value: "Bread",
                label: "Bread",
                children: [
                    {
                        showCheckbox: false,
                        value: "Flour",
                        label: "Flour"
                    },
                    {
                        showCheckbox: false,
                        value: "Water",
                        label: "Water"
                    }
                ]
            },
            {
                showCheckbox: false,
                value: "Cheese",
                label: "Cheese",
                children: [
                    {
                        showCheckbox: false,
                        value: "Milk",
                        label: "Milk"
                    }
                ]
            }
        ]
    },
    {
        showCheckbox: false,
        value: "English Breakfast",
        label: "English Breakfast",
        children: [
            {
                showCheckbox: false,
                value: "Fried Eggs",
                label: "Fried Eggs",
                children: [
                    {
                        showCheckbox: false,
                        value: "Egg",
                        label: "Egg"
                    }
                ]
            },
            {
                showCheckbox: false,
                value: "Mushrooms",
                label: "Mushrooms"
            },
            {
                showCheckbox: false,
                value: "Sausages",
                label: "Sausages",
                children: [
                    {
                        showCheckbox: false,
                        value: "Meat",
                        label: "Meat",
                        children: [
                            {
                                showCheckbox: false,
                                value: "Pork",
                                label: "Pork"
                            }
                        ]
                    }
                ]
            },
            {
                showCheckbox: false,
                value: "Bread",
                label: "Bread",
                children: [
                    {
                        showCheckbox: false,
                        value: "Flour",
                        label: "Flour"
                    },
                    {
                        showCheckbox: false,
                        value: "Water",
                        label: "Water"
                    }
                ]
            }
        ]
    }
];

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        };
    }

    // When User inputs in the search field
    onSearchChange = (event, data) => {
        this.setState(x => {
            if (x.word.trim() && !data.value.trim()) {
                return {
                    word: data.value
                };
            }
            return {
                word: data.value
            };
        });
    };

    // When the given search input character found it will highlight the characters
    CharacterHighlight = (text, character) => {
        const i = text.toLowerCase().indexOf(character.toLowerCase()); //for insensitive case

        return i !== -1 ? (<span>{text.substring(0, i)}<span style={{background: "#ffd232", color:"red"}}>{text.substring(i, i + character.length)}</span>{text.substring(i + character.length)}</span>)
            :
            (<span>{text}</span>);
    };

    // search the given word in the search field from the nodeList...
    wordSearch = (nodes, word) => {
        let newArray = [];
        for (let n of nodes) {
            if (!n.children) {
                if (n.label.toLowerCase().includes(word.toLowerCase())) {
                    n.label = this.CharacterHighlight(n.label, word);
                    newArray.push(n);
                }

            } else {
                const next = this.wordSearch(n.children, word);

                if (next.length > 0) {
                    n.children = next;

                } else if (n.label.toLowerCase().includes(word.toLowerCase())) {
                    n.children = next.length > 0 ? next : [];
                }
                if (next.length > 0 || n.label.toLowerCase().includes(word.toLowerCase())) {
                    n.label = this.CharacterHighlight(n.label, word);
                    newArray.push(n);
                }
            }
        }
        return newArray;
    };

    render() {
        let searchedMenuItems = this.state.word.trim()
            ? this.wordSearch(_.deepClone(MenuItems), this.state.word)
            : MenuItems;
        return (
            <div>

                <h3>Restaurant Menu</h3>

                <Input
                    placeholder="Search allergen items..."
                    onChange={(event, data) => {
                        this.onSearchChange(event, data);
                    }}/>
                <CheckboxTree
                    nodes={searchedMenuItems}
                    showNodeIcon={false}
                    expanded={this.state.expanded}
                    onExpand={expanded => this.setState({expanded})}
                    expandOnClick
                    onClick={() => {
                        console.log("Success!!!");
                    }}
                />
            </div>
        );
    }
}