/*
 * Grid preview
 * Renders a live demo into every <div class="gridPreview" data-preview="key">.
 * Each demo is described by a config in GRID_PREVIEWS:
 *   container: CSS that is always applied to the grid container
 *   controls:  rows of buttons; each option is a value for `prop`,
 *              or { label, css: { prop: value } } to set several properties;
 *              type: 'count' options set how many items are shown instead;
 *              target: n applies the control to item n (0-based) instead
 *              of the container; target: 'all' applies it to every item
 *   items:     number of items, or a list of { label, name, css, style, children }
 *              (style is visual only and not shown in the code panel;
 *              children are text labels for nested elements)
 *   itemCss:   CSS applied to every item
 *   inlineText: wrap the container in text (for inline-grid)
 * A "\n" inside a value is only used to format the code panel.
 */
var GRID_PREVIEWS = {

	'intro': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'display', options: ['block', 'grid'], value: 1 },
			{ prop: 'grid-template-columns', options: ['repeat(3, 1fr)', '1fr 2fr', 'repeat(auto-fit, minmax(100px, 1fr))'] },
			{ target: 0, prop: 'grid-column', options: ['auto', 'span 2', '1 / -1'] }
		],
		items: 6
	},

	'display': {
		container: { 'grid-template-columns': 'repeat(3, 80px)', 'gap': '10px' },
		controls: [
			{ prop: 'display', options: ['block', 'grid', 'inline-grid'], value: 1 }
		],
		items: 3,
		inlineText: true
	},

	'grid-template': {
		container: { 'gap': '10px', 'height': '100%' },
		controls: [
			{ prop: 'grid-template-columns', options: ['1fr 1fr 1fr', '100px 1fr 2fr', 'repeat(4, 1fr)', '200px auto'] },
			{ prop: 'grid-template-rows', options: ['auto', '60px 1fr', '80px 80px'] }
		],
		items: 6
	},

	'grid-template-areas': {
		container: { 'gap': '10px', 'height': '100%' },
		controls: [
			{ label: 'layout', options: [
				{ label: 'sidebar left', css: {
					'grid-template-columns': '150px 1fr',
					'grid-template-rows': 'auto 1fr auto',
					'grid-template-areas': '"header header"\n"sidebar main"\n"footer footer"'
				} },
				{ label: 'sidebar right', css: {
					'grid-template-columns': '1fr 150px',
					'grid-template-rows': 'auto 1fr auto',
					'grid-template-areas': '"header header"\n"main sidebar"\n"footer footer"'
				} },
				{ label: 'stacked', css: {
					'grid-template-columns': '1fr',
					'grid-template-rows': 'auto auto 1fr auto',
					'grid-template-areas': '"header"\n"sidebar"\n"main"\n"footer"'
				} },
				{ label: 'empty cells', css: {
					'grid-template-columns': '1fr 1fr 1fr',
					'grid-template-rows': 'auto 1fr auto',
					'grid-template-areas': '"header header ."\n"sidebar main main"\n". footer footer"'
				} }
			] }
		],
		items: [
			{ label: 'header', name: 'header', css: { 'grid-area': 'header' } },
			{ label: 'sidebar', name: 'sidebar', css: { 'grid-area': 'sidebar' } },
			{ label: 'main', name: 'main', css: { 'grid-area': 'main' } },
			{ label: 'footer', name: 'footer', css: { 'grid-area': 'footer' } }
		]
	},

	'grid-template-shorthand': {
		container: { 'gap': '10px', 'height': '100%' },
		controls: [
			{ prop: 'grid-template', options: [
				'"header header" 50px\n"sidebar main" 1fr\n"footer footer" 40px\n/ 150px 1fr',
				'"header header" 50px\n"sidebar main" 1fr\n"footer footer" 40px\n/ 250px 1fr',
				'"header" 50px\n"sidebar" 60px\n"main" 1fr\n"footer" 40px\n/ 1fr'
			], labels: ['sidebar 150px', 'sidebar 250px', 'stacked'] }
		],
		items: [
			{ label: 'header', name: 'header', css: { 'grid-area': 'header' } },
			{ label: 'sidebar', name: 'sidebar', css: { 'grid-area': 'sidebar' } },
			{ label: 'main', name: 'main', css: { 'grid-area': 'main' } },
			{ label: 'footer', name: 'footer', css: { 'grid-area': 'footer' } }
		]
	},

	'gap': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)' },
		controls: [
			{ prop: 'gap', options: ['0', '10px', '20px', '10px 40px', '40px 10px'], value: 1 }
		],
		items: 9
	},

	'justify-items': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-auto-rows': '80px', 'gap': '10px' },
		controls: [
			{ prop: 'justify-items', options: ['stretch', 'start', 'end', 'center'] }
		],
		items: 6
	},

	'align-items': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': 'repeat(2, 120px)', 'gap': '10px' },
		controls: [
			{ prop: 'align-items', options: ['stretch', 'start', 'end', 'center', 'baseline'] }
		],
		items: [
			{ label: '1' },
			{ label: '2', css: { 'padding-top': '30px' } },
			{ label: '3' }, { label: '4' }, { label: '5' }, { label: '6' }
		]
	},

	'justify-content': {
		container: { 'grid-template-columns': 'repeat(3, auto)', 'gap': '10px' },
		controls: [
			{ prop: 'justify-content', options: ['normal', 'start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'] }
		],
		items: 6
	},

	'align-content': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': 'repeat(2, 60px)', 'gap': '10px', 'height': '100%' },
		controls: [
			{ prop: 'align-content', options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'] }
		],
		items: 6
	},

	'grid-auto-rows': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': '60px', 'gap': '10px' },
		controls: [
			{ prop: 'grid-auto-rows', options: ['auto', '40px', '80px', 'minmax(60px, auto)'] }
		],
		items: [
			{ label: '1' }, { label: '2' }, { label: '3' },
			{ label: '4' }, { label: '5: an implicit row with more text inside' }, { label: '6' },
			{ label: '7' }
		]
	},

	'grid-auto-flow': {
		container: { 'grid-template-columns': 'repeat(4, 1fr)', 'grid-template-rows': 'repeat(3, 50px)', 'grid-auto-columns': '1fr', 'grid-auto-rows': '50px', 'gap': '10px' },
		controls: [
			{ prop: 'grid-auto-flow', options: ['row', 'row dense', 'column', 'column dense'] }
		],
		items: [
			{ label: '1' },
			{ label: '2', css: { 'grid-column': 'span 2' } },
			{ label: '3', css: { 'grid-column': 'span 3' } },
			{ label: '4' }, { label: '5' }, { label: '6' }, { label: '7' }
		]
	},

	'fr': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['1fr 1fr 1fr', '1fr 2fr 1fr', '1fr 3fr', '100px 1fr 1fr', '100px 1fr 2fr'] },
			{ prop: 'width', options: ['100%', '60%'] }
		],
		items: 6
	},

	'fr-vs-percent': {
		container: {},
		controls: [
			{ prop: 'grid-template-columns', options: ['33.33% 33.33% 33.33%', '1fr 1fr 1fr', '200px 50% 50%', '200px 1fr 1fr'] },
			{ prop: 'gap', options: ['0', '16px', '40px'], value: 1 }
		],
		items: 6
	},

	'repeat': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(2, 1fr 2fr)', 'repeat(2, 60px 1fr)'] }
		],
		items: 8
	},

	'minmax': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['1fr 1fr', 'minmax(0, 1fr) 1fr', 'minmax(150px, 1fr) 1fr', 'minmax(100px, 160px) 1fr'] },
			{ prop: 'width', options: ['100%', '60%', '35%'] }
		],
		items: [
			{ label: 'Supercalifragilistic' }, { label: '2' },
			{ label: '3' }, { label: '4' }
		]
	},

	'auto-fill-fit': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['repeat(auto-fill, minmax(80px, 1fr))', 'repeat(auto-fit, minmax(80px, 1fr))'], labels: ['auto-fill', 'auto-fit'] },
			{ label: 'items', type: 'count', options: [2, 4, 9] },
			{ prop: 'width', options: ['100%', '60%'] }
		],
		items: 9
	},

	'content-sizing': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['min-content 1fr', 'max-content 1fr', 'fit-content(150px) 1fr', 'auto 1fr', '1fr 1fr'] }
		],
		items: [
			{ label: 'Grid layout is two-dimensional' }, { label: '2' },
			{ label: 'Short' }, { label: '4' }
		]
	},

	'grid-line-placement': {
		container: { 'grid-template-columns': 'repeat(4, 1fr)', 'grid-auto-rows': '60px', 'gap': '10px' },
		controls: [
			{ target: 0, prop: 'grid-column-start', options: ['auto', '1', '2', '3'], value: 2 },
			{ target: 0, prop: 'grid-column-end', options: ['auto', '3', '4', '5'], value: 2 },
			{ target: 0, prop: 'grid-row-start', options: ['auto', '1', '2'], value: 1 },
			{ target: 0, prop: 'grid-row-end', options: ['auto', '2', '3', '4'], value: 2 }
		],
		items: 7
	},

	'span-negative': {
		container: { 'grid-template-columns': 'repeat(4, 1fr)', 'grid-auto-rows': '50px', 'gap': '10px' },
		controls: [
			{ target: 0, prop: 'grid-column', options: ['auto', '1 / -1', 'span 2', 'span 3', '2 / -1', '-3 / -1'], value: 1 },
			{ target: 2, prop: 'grid-row', options: ['auto', 'span 2', 'span 3'] }
		],
		items: 8
	},

	'grid-area': {
		container: {
			'grid-template-columns': 'repeat(3, 1fr)',
			'grid-template-rows': 'repeat(3, 60px)',
			'grid-template-areas': '"hero hero side"\n"main main side"\n"main main foot"',
			'gap': '10px'
		},
		controls: [
			{ target: 0, prop: 'grid-area', options: ['auto', 'hero', 'side', 'main', '1 / 1 / 2 / 4', '2 / 2 / 4 / 4'], value: 3 }
		],
		items: 5
	},

	'justify-self': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-auto-rows': '80px', 'gap': '10px' },
		controls: [
			{ target: 1, prop: 'justify-self', options: ['auto', 'start', 'end', 'center', 'stretch'], value: 1 },
			{ prop: 'justify-items', options: ['stretch', 'center'] }
		],
		items: 6
	},

	'align-self': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': 'repeat(2, 120px)', 'gap': '10px' },
		controls: [
			{ target: 1, prop: 'align-self', options: ['auto', 'start', 'end', 'center', 'stretch'], value: 1 },
			{ prop: 'align-items', options: ['stretch', 'center'] }
		],
		items: 6
	},

	'overlap': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': 'repeat(3, 70px)', 'gap': '10px' },
		controls: [
			{ target: 0, prop: 'z-index', options: ['auto', '1', '2'] },
			{ target: 1, prop: 'z-index', options: ['auto', '1', '3'] }
		],
		items: [
			{ label: 'A', css: { 'grid-area': '1 / 1 / 3 / 3' } },
			{ label: 'B', css: { 'grid-area': '2 / 2 / 4 / 4' } },
			{ label: 'C', css: { 'grid-area': '1 / 3 / 2 / 4' } }
		]
	},

	'tip-cards': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid-template-columns', options: ['repeat(auto-fit, minmax(120px, 1fr))', 'repeat(auto-fill, minmax(120px, 1fr))'], labels: ['auto-fit', 'auto-fill'] },
			{ prop: 'width', options: ['100%', '70%', '45%'] },
			{ label: 'items', type: 'count', options: [2, 6] }
		],
		items: [
			{ label: 'Card 1' }, { label: 'Card 2' }, { label: 'Card 3' },
			{ label: 'Card 4' }, { label: 'Card 5' }, { label: 'Card 6' }
		],
		itemCss: { 'min-height': '70px' }
	},

	'tip-page-layout': {
		container: { 'gap': '10px', 'height': '100%' },
		controls: [
			{ label: 'screen', options: [
				{ label: 'mobile', css: {
					'width': '45%',
					'grid-template-columns': '1fr',
					'grid-template-areas': '"header"\n"main"\n"sidebar"\n"footer"'
				} },
				{ label: '@media (min-width: 768px)', css: {
					'width': '100%',
					'grid-template-columns': '120px 1fr',
					'grid-template-areas': '"header header"\n"sidebar main"\n"footer footer"'
				} }
			] }
		],
		items: [
			{ label: 'header', name: 'header', css: { 'grid-area': 'header' } },
			{ label: 'main', name: 'main', css: { 'grid-area': 'main' }, style: { 'min-height': '90px' } },
			{ label: 'sidebar', name: 'sidebar', css: { 'grid-area': 'sidebar' } },
			{ label: 'footer', name: 'footer', css: { 'grid-area': 'footer' } }
		]
	},

	'tip-overlay': {
		container: {},
		controls: [
			{ target: 1, prop: 'align-self', options: ['end', 'center', 'start'] },
			{ target: 1, prop: 'justify-self', options: ['stretch', 'start', 'end'] }
		],
		items: [
			{ label: 'image', name: 'hero img', css: { 'grid-area': '1 / 1' },
				style: { 'height': '220px', 'background': 'linear-gradient(135deg, #6190ba, #1c1e22)', 'color': 'rgba(255,255,255,0.5)' } },
			{ label: 'Caption over the image', name: 'caption', css: { 'grid-area': '1 / 1' },
				style: { 'background': 'rgba(0, 0, 0, 0.6)', 'margin': '10px' } }
		]
	},

	'tip-center': {
		container: { 'height': '100%' },
		controls: [
			{ prop: 'place-items', options: ['normal', 'center', 'end center'], value: 1 },
			{ label: 'items', type: 'count', options: [1, 3] }
		],
		items: 3
	},

	'tip-full-bleed': {
		container: {
			'grid-template-columns': '[full-start] 1fr\n[content-start] min(240px, 100% - 2rem)\n[content-end] 1fr [full-end]',
			'row-gap': '10px'
		},
		controls: [
			{ target: 2, prop: 'grid-column', options: ['content', 'full'], value: 1 }
		],
		items: [
			{ label: 'Paragraph' }, { label: 'Paragraph' },
			{ label: 'Wide image (.bleed)' }, { label: 'Paragraph' }
		],
		itemCss: { 'grid-column': 'content' }
	},

	'tip-subgrid': {
		container: { 'grid-template-columns': 'repeat(3, 1fr)', 'gap': '10px' },
		controls: [
			{ target: 'all', prop: 'grid-template-rows', options: ['subgrid', 'auto 1fr auto'], labels: ['subgrid', 'auto 1fr auto (no subgrid)'] }
		],
		itemCss: { 'grid-row': 'span 3', 'display': 'grid' },
		items: [
			{ children: ['Short title', 'One line of text.', 'Buy'] },
			{ children: ['A much longer card title that wraps', 'Body text that runs over several lines, so this card is taller.', 'Buy'] },
			{ children: ['Medium title', 'Two lines of body text.', 'Buy'] }
		]
	},

	'tip-dense': {
		container: { 'grid-template-columns': 'repeat(auto-fill, minmax(70px, 1fr))', 'grid-auto-rows': '60px', 'gap': '8px' },
		controls: [
			{ prop: 'grid-auto-flow', options: ['row', 'dense'] }
		],
		items: [
			{ label: '1' },
			{ label: '2', name: 'wide', css: { 'grid-column': 'span 2' } },
			{ label: '3' },
			{ label: '4', name: 'tall', css: { 'grid-row': 'span 2' } },
			{ label: '5', name: 'wide', css: { 'grid-column': 'span 2' } },
			{ label: '6' },
			{ label: '7', name: 'wide', css: { 'grid-column': 'span 2' } },
			{ label: '8' },
			{ label: '9', name: 'tall', css: { 'grid-row': 'span 2' } },
			{ label: '10' },
			{ label: '11' }
		]
	},

	'grid': {
		container: { 'gap': '10px' },
		controls: [
			{ prop: 'grid', options: [
				'auto-flow 60px / repeat(3, 1fr)',
				'repeat(2, 80px) / auto-flow 100px',
				'"a a b" 80px\n"c c b" 80px\n/ 1fr 1fr 1fr'
			] }
		],
		items: 6
	}

};

(function () {

	function esc(text) {
		return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	// "\n" only formats the code panel; the browser gets a single line.
	function flat(value) {
		return value.replace(/\s*\n\s*/g, ' ');
	}

	function optionCss(control, option) {
		if (control.type === 'count') {
			return {};
		}
		if (typeof option === 'object') {
			return option.css;
		}
		var css = {};
		css[control.prop] = option;
		return css;
	}

	function optionLabel(control, option, index) {
		if (typeof option === 'object') {
			return option.label;
		}
		if (control.type === 'count') {
			return option + ' items';
		}
		return control.labels ? control.labels[index] : option;
	}

	function codeRule(selector, rules) {
		var out = '<span class="pvSel">' + esc(selector) + '</span> {\n';
		rules.forEach(function (rule) {
			var value = esc(rule.value).replace(/\n/g, '\n      ');
			var line = '  <span class="pvProp">' + esc(rule.prop) + '</span>: ' + value + ';';
			out += rule.changed ? '<span class="pvChanged">' + line + '</span>\n' : line + '\n';
		});
		return out + '}\n';
	}

	function buildPreview(el, key, config) {
		var items = typeof config.items === 'number'
			? Array.apply(null, Array(config.items)).map(function (_, i) { return { label: String(i + 1) }; })
			: config.items;
		var selected = config.controls.map(function (control) { return control.value || 0; });

		el.innerHTML =
			'<div class="pvHead"><span>' + esc(key) + '</span><span>live preview</span></div>' +
			'<div class="pvControls"></div>' +
			'<div class="pvBody">' +
				'<div class="pvStage"></div>' +
				'<div class="pvCode"></div>' +
			'</div>';

		var controlsEl = el.querySelector('.pvControls');
		var stage = el.querySelector('.pvStage');
		var code = el.querySelector('.pvCode');

		var grid = document.createElement('div');
		grid.className = 'pvGrid';
		items.forEach(function (item, i) {
			var child = document.createElement('div');
			if (item.children) {
				item.children.forEach(function (text) {
					var inner = document.createElement('div');
					inner.textContent = text;
					child.appendChild(inner);
				});
			}
			else {
				child.textContent = item.label;
			}
			config.controls.forEach(function (control) {
				if (control.target === i) {
					child.className = 'pvTarget';
				}
			});
			grid.appendChild(child);
		});

		if (config.inlineText) {
			stage.classList.add('pvInline');
			stage.appendChild(document.createTextNode('Text before the container '));
			stage.appendChild(grid);
			stage.appendChild(document.createTextNode(' text after the container.'));
		}
		else {
			stage.appendChild(grid);
		}

		config.controls.forEach(function (control, c) {
			var row = document.createElement('div');
			row.className = 'pvRow';
			var label = control.prop || control.label;
			if (control.target === 'all') {
				label = 'items \u203a ' + label;
			}
			else if (control.target !== undefined) {
				label = 'item ' + (control.target + 1) + ' \u203a ' + label;
			}
			row.innerHTML = '<span class="pvLabel">' + esc(label) + ':</span>';
			control.options.forEach(function (option, o) {
				var button = document.createElement('button');
				button.type = 'button';
				button.textContent = flat(optionLabel(control, option, o));
				button.addEventListener('click', function () {
					selected[c] = o;
					render();
				});
				row.appendChild(button);
			});
			controlsEl.appendChild(row);
		});

		function render() {
			var hasDisplay = false;
			var rules = [];
			var applied = {};
			var visible = items.length;
			var targetCss = items.map(function () { return {}; });
			var allCss = {};

			config.controls.forEach(function (control, c) {
				if (control.type === 'count') {
					visible = control.options[selected[c]];
				}
				var css = optionCss(control, control.options[selected[c]]);
				if (control.target !== undefined) {
					for (var t in css) {
						if (control.target === 'all') {
							allCss[t] = css[t];
						}
						else {
							targetCss[control.target][t] = css[t];
						}
					}
					css = {};
				}
				for (var prop in css) {
					applied[prop] = css[prop];
					if (prop === 'display') {
						hasDisplay = true;
					}
				}
				var buttons = controlsEl.children[c].querySelectorAll('button');
				for (var b = 0; b < buttons.length; b++) {
					buttons[b].classList.toggle('active', b === selected[c]);
				}
			});


			// display always comes first in the code panel
			grid.removeAttribute('style');
			if (hasDisplay) {
				grid.style.display = applied.display;
				rules.push({ prop: 'display', value: applied.display, changed: true });
				delete applied.display;
			}
			else {
				grid.style.display = 'grid';
				rules.push({ prop: 'display', value: 'grid' });
			}
			for (var prop in config.container) {
				grid.style.setProperty(prop, flat(config.container[prop]));
				rules.push({ prop: prop, value: config.container[prop] });
			}
			for (prop in applied) {
				grid.style.setProperty(prop, flat(applied[prop]));
				rules.push({ prop: prop, value: applied[prop], changed: true });
			}

			var text = codeRule('.container', rules);
			var shared = Object.keys(config.itemCss || {}).map(function (p) {
				return { prop: p, value: config.itemCss[p] };
			}).concat(Object.keys(allCss).map(function (p) {
				return { prop: p, value: allCss[p], changed: true };
			}));
			if (shared.length) {
				text += '\n' + codeRule('.item', shared);
			}
			var printed = {};

			items.forEach(function (item, i) {
				var child = grid.children[i];
				var itemRules = [];
				child.removeAttribute('style');
				for (var p in (config.itemCss || {})) {
					child.style.setProperty(p, config.itemCss[p]);
				}
				for (p in allCss) {
					child.style.setProperty(p, flat(allCss[p]));
				}
				for (p in (item.css || {})) {
					child.style.setProperty(p, flat(item.css[p]));
					itemRules.push({ prop: p, value: item.css[p] });
				}
				for (p in (item.style || {})) {
					child.style.setProperty(p, item.style[p]);
				}
				for (p in targetCss[i]) {
					child.style.setProperty(p, flat(targetCss[i][p]));
					itemRules.push({ prop: p, value: targetCss[i][p], changed: true });
				}
				if (i >= visible) {
					child.style.display = 'none';
				}
				var selector = item.name ? '.' + item.name : '.item:nth-child(' + (i + 1) + ')';
				if (itemRules.length && !printed[selector]) {
					printed[selector] = true;
					text += '\n' + codeRule(selector, itemRules);
				}
			});
			code.innerHTML = text;
		}

		render();
	}

	function init() {
		var previews = document.querySelectorAll('.gridPreview[data-preview]');
		for (var i = 0; i < previews.length; i++) {
			var key = previews[i].getAttribute('data-preview');
			if (GRID_PREVIEWS[key]) {
				buildPreview(previews[i], previews[i].getAttribute('data-title') || key, GRID_PREVIEWS[key]);
			}
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	}
	else {
		init();
	}

})();
