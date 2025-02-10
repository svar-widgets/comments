function parse(str, ast, notFinal) {
	let content;
	let ctype;
	let headerlevel, newLineCounter;
	let checkbehind, unsurepoint;
	let linestart;
	let i;
	if (!ast) {
		ast = {
			nodes: [{ d: [], t: "p", f: false, i: 0 }],
			length: 0,
			state: {},
		};
		linestart = 0;
		headerlevel = 0;
		checkbehind = -1;
		unsurepoint = -1;
		content = "";
		ctype = "";
		newLineCounter = 0;
		i = 0;
	} else {
		({
			linestart,
			headerlevel,
			checkbehind,
			unsurepoint,
			content,
			ctype,
			newLineCounter,
			i,
		} = ast.state);
	}
	if (unsurepoint) {
		const b = ast.nodes[ast.nodes.length - 1];
		if (b.d.length) {
			ast.length -= b.d[b.d.length - 1].c.length;
			b.d.pop();
		}
	}
	const finishBlock = notFinal2 => {
		if (content !== "") {
			finishText("", notFinal2);
		}
		const lastBlock = ast.nodes[ast.nodes.length - 1];
		lastBlock.f = notFinal2 !== 1;
		lastBlock.i = i;
		if (headerlevel > 0) {
			lastBlock.t = `h${headerlevel}`;
			headerlevel = -1;
		}
		if (notFinal2 === 0) ast.nodes.push({ d: [], t: "p", f: false, i: 0 });
	};
	const finishText = (t, notFinal2 = 2) => {
		const block = ast.nodes[ast.nodes.length - 1];
		const last = block.d[block.d.length - 1];
		const utype = notFinal2 === 2 ? ctype : "";
		if (last && last.t === utype && unsurepoint < 0) {
			const text = last;
			ast.length += content.length;
			text.c = text.c + content;
			text.i = i;
		} else {
			const c =
				utype === "" && unsurepoint >= 0
					? str.substring(unsurepoint)
					: content;
			ast.length += c.length;
			block.d.push({ c, t: utype, f: notFinal2 !== 1, i });
		}
		if (notFinal2 === 2) {
			if (t) {
				unsurepoint = checkbehind;
			} else {
				unsurepoint = -1;
			}
		}
		if (notFinal2 !== 1) {
			content = "";
			ctype = t;
			checkbehind = -1;
		}
	};
	for (; i < str.length; i++) {
		const char = str[i];
		if (char === "\n") {
			newLineCounter++;
			linestart = i + 1;
			continue;
		}
		if (char === " " || char === "	") {
			if (newLineCounter > 0) {
				continue;
			}
		}
		if (newLineCounter > 0) {
			if (newLineCounter > 1) {
				finishBlock(0);
			} else {
				content += "\n";
			}
			newLineCounter = 0;
		}
		if (char == "*" || char == "`" || char == "#") {
			if (str[i - 1] == "\\") {
				content += char;
			} else if (checkbehind === -1) {
				checkbehind = i;
			}
		} else {
			if (checkbehind >= 0) {
				const l = i - checkbehind;
				if (str[i - 1] == "*") {
					if (l === 2) {
						if (ctype === "strong") {
							finishText("");
						} else {
							finishText("strong");
						}
					} else if (l === 1) {
						if (ctype === "em") {
							finishText("");
						} else {
							finishText("em");
						}
					}
					checkbehind = -1;
				} else if (str[i - 1] == "`" && l == 1) {
					if (ctype === "code") {
						finishText("");
					} else {
						finishText("code");
					}
					checkbehind = -1;
				} else if (
					str[i - 1] == "#" &&
					str[i] === " " &&
					checkbehind === linestart &&
					i - checkbehind <= 6
				) {
					headerlevel = i - checkbehind;
					checkbehind = -1;
					continue;
				}
			}
			if (checkbehind !== -1) {
				content += str.substring(checkbehind, i);
				checkbehind = -1;
			}
			content += char;
		}
	}
	finishBlock(notFinal ? 1 : -1);
	if (notFinal) {
		ast.state = {
			linestart,
			headerlevel,
			checkbehind,
			unsurepoint,
			content,
			ctype,
			newLineCounter,
			i,
		};
	} else {
		ast.state = {};
	}
	return ast;
}
function render(target, ast) {
	_renderNodes(target, ast.nodes);
}
function _renderNodes(target, nodes) {
	if (!target) return;
	for (const node of nodes) {
		if (typeof node.d !== "undefined") {
			const block = node;
			const el = document.createElement(block.t);
			target.appendChild(el);
			_renderNodes(el, block.d);
		} else {
			const text = node;
			if (text.t) {
				const el = document.createElement(node.t);
				el.textContent = text.c;
				target.appendChild(el);
			} else {
				const el = document.createTextNode(text.c);
				target.appendChild(el);
			}
		}
	}
}
function renderNext(target, ast, prevState, distance, cursor) {
	if (!target) return;
	return (
		_renderNodesNext(target, ast.nodes, prevState, distance, 0, cursor) ===
		0
	);
}
function _renderNodesNext(target, nodes, prevState, distance, level, cursor) {
	let start = 0,
		textIndex = 0,
		el = null,
		temp = null;
	const prev = prevState[level];
	if (prev) {
		start = prev.nodeIndex;
		textIndex = prev.textIndex;
		el = prev.target;
		temp = prev.temp;
	}
	for (let i = start; i < nodes.length; i++) {
		const node = nodes[i];
		if (typeof node.d !== "undefined") {
			const block = nodes[i];
			if (!el) {
				el = document.createElement(block.t);
				target.appendChild(el);
			}
			distance = _renderNodesNext(
				el,
				block.d,
				prevState,
				distance,
				level + 1,
				cursor
			);
			if (!distance) {
				prevState[level] = { nodeIndex: i, textIndex: 0, target: el };
				return 0;
			}
			el = null;
		} else {
			let textContent;
			const text = node;
			if (text.c.length - textIndex > distance) {
				textContent = text.c.substring(textIndex, textIndex + distance);
				textIndex += distance;
				distance = 0;
			} else {
				textContent = text.c.substring(textIndex);
				distance -= text.c.length - textIndex;
				textIndex = 0;
			}
			if (text.t) {
				if (!el) {
					el = document.createElement(text.t);
					target.insertBefore(el, temp);
					el.textContent = textContent;
				} else {
					el.textContent += textContent;
				}
			} else {
				if (!el) {
					const el2 = document.createTextNode(textContent);
					target.insertBefore(el2, temp);
				} else {
					el.textContent += textContent;
				}
			}
			if (distance === 0) {
				if (!temp) temp = addCursor(target, cursor);
				prevState[level] = textIndex
					? { temp, nodeIndex: i, textIndex, target: el }
					: { temp, nodeIndex: i + 1, textIndex: 0, target: null };
				return distance;
			}
			el = null;
		}
	}
	prevState[level] = null;
	if (temp) temp.parentNode.removeChild(temp);
	return distance;
}
function addCursor(parent, name) {
	const el = document.createElement("div");
	el.className = name;
	el.textContent = " ";
	parent.appendChild(el);
	return el;
}
function asHTML(a) {
	let out = "";
	for (const node of a) {
		if (typeof node.d !== "undefined") {
			out += "<" + node.t + ">";
			out += asHTML(node.d);
			out += "</" + node.t + ">";
		} else {
			if (node.t) out += "<" + node.t + ">";
			out += node.c;
			if (node.t) out += "</" + node.t + ">";
		}
	}
	return out;
}
function asMarkdown(a) {
	let out = "";
	let space = "";
	for (const node of a) {
		if (typeof node.d !== "undefined") {
			if (node.t === "h1") {
				out += space + "# ";
			} else if (node.t === "h2") {
				out += space + "## ";
			} else if (node.t === "h3") {
				out += space + "### ";
			} else if (node.t === "h4") {
				out += space + "#### ";
			} else if (node.t === "h5") {
				out += space + "##### ";
			} else if (node.t === "h6") {
				out += space + "###### ";
			} else {
				out += space;
			}
			space = "\n\n";
			out += asMarkdown(node.d);
		} else {
			let wrap = "";
			if (node.t === "strong") {
				wrap = "**";
			} else if (node.t === "em") {
				wrap = "*";
			} else if (node.t === "code") {
				wrap = "`";
			}
			out += wrap + node.c + wrap;
		}
	}
	return out;
}
function html(s) {
	return asHTML(parse(s).nodes);
}
export { asHTML, asMarkdown, html, parse, render, renderNext };
