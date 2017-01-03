
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		var name = v.func ? v.func.name : v.name;
		return '<function' + (name === '' ? '' : ':') + name + '>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;
	
	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}	
	
	return _elm_lang$core$Native_List.fromArray(is);
}

function toInt(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
		start = 1;
	}
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
	}
	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function toFloat(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
		}
		start = 1;
	}
	var dotCount = 0;
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if ('0' <= c && c <= '9')
		{
			continue;
		}
		if (c === '.')
		{
			dotCount += 1;
			if (dotCount <= 1)
			{
				continue;
			}
		}
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	return _elm_lang$core$Result$Ok(parseFloat(s));
}

function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (!a.options === b.options)
	{
		if (a.stopPropagation !== b.stopPropagation || a.preventDefault !== b.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { callback(); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		var value = result._0;
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		currentSend(incomingValue);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _Ragamuffine$daoc_patch_notes$Message$WizardPage = {ctor: 'WizardPage'};
var _Ragamuffine$daoc_patch_notes$Message$WarriorPage = {ctor: 'WarriorPage'};
var _Ragamuffine$daoc_patch_notes$Message$WarlockPage = {ctor: 'WarlockPage'};
var _Ragamuffine$daoc_patch_notes$Message$WardenPage = {ctor: 'WardenPage'};
var _Ragamuffine$daoc_patch_notes$Message$VampiirPage = {ctor: 'VampiirPage'};
var _Ragamuffine$daoc_patch_notes$Message$ValkyriePage = {ctor: 'ValkyriePage'};
var _Ragamuffine$daoc_patch_notes$Message$ValewalkerPage = {ctor: 'ValewalkerPage'};
var _Ragamuffine$daoc_patch_notes$Message$TheurgistPage = {ctor: 'TheurgistPage'};
var _Ragamuffine$daoc_patch_notes$Message$ThanePage = {ctor: 'ThanePage'};
var _Ragamuffine$daoc_patch_notes$Message$SpiritmasterPage = {ctor: 'SpiritmasterPage'};
var _Ragamuffine$daoc_patch_notes$Message$SorcererPage = {ctor: 'SorcererPage'};
var _Ragamuffine$daoc_patch_notes$Message$SkaldPage = {ctor: 'SkaldPage'};
var _Ragamuffine$daoc_patch_notes$Message$ShamanPage = {ctor: 'ShamanPage'};
var _Ragamuffine$daoc_patch_notes$Message$ShadowbladePage = {ctor: 'ShadowbladePage'};
var _Ragamuffine$daoc_patch_notes$Message$ScoutPage = {ctor: 'ScoutPage'};
var _Ragamuffine$daoc_patch_notes$Message$SavagePage = {ctor: 'SavagePage'};
var _Ragamuffine$daoc_patch_notes$Message$RunemasterPage = {ctor: 'RunemasterPage'};
var _Ragamuffine$daoc_patch_notes$Message$ReaverPage = {ctor: 'ReaverPage'};
var _Ragamuffine$daoc_patch_notes$Message$RangerPage = {ctor: 'RangerPage'};
var _Ragamuffine$daoc_patch_notes$Message$PaladinPage = {ctor: 'PaladinPage'};
var _Ragamuffine$daoc_patch_notes$Message$NightshadePage = {ctor: 'NightshadePage'};
var _Ragamuffine$daoc_patch_notes$Message$NecromancerPage = {ctor: 'NecromancerPage'};
var _Ragamuffine$daoc_patch_notes$Message$MinstrelPage = {ctor: 'MinstrelPage'};
var _Ragamuffine$daoc_patch_notes$Message$MercenaryPage = {ctor: 'MercenaryPage'};
var _Ragamuffine$daoc_patch_notes$Message$MentalistPage = {ctor: 'MentalistPage'};
var _Ragamuffine$daoc_patch_notes$Message$MaulerPage = {ctor: 'MaulerPage'};
var _Ragamuffine$daoc_patch_notes$Message$InfiltratorPage = {ctor: 'InfiltratorPage'};
var _Ragamuffine$daoc_patch_notes$Message$HunterPage = {ctor: 'HunterPage'};
var _Ragamuffine$daoc_patch_notes$Message$HeroPage = {ctor: 'HeroPage'};
var _Ragamuffine$daoc_patch_notes$Message$HereticPage = {ctor: 'HereticPage'};
var _Ragamuffine$daoc_patch_notes$Message$HealerPage = {ctor: 'HealerPage'};
var _Ragamuffine$daoc_patch_notes$Message$FriarPage = {ctor: 'FriarPage'};
var _Ragamuffine$daoc_patch_notes$Message$EnchanterPage = {ctor: 'EnchanterPage'};
var _Ragamuffine$daoc_patch_notes$Message$EldritchPage = {ctor: 'EldritchPage'};
var _Ragamuffine$daoc_patch_notes$Message$DruidPage = {ctor: 'DruidPage'};
var _Ragamuffine$daoc_patch_notes$Message$ClericPage = {ctor: 'ClericPage'};
var _Ragamuffine$daoc_patch_notes$Message$ChampionPage = {ctor: 'ChampionPage'};
var _Ragamuffine$daoc_patch_notes$Message$CabalistPage = {ctor: 'CabalistPage'};
var _Ragamuffine$daoc_patch_notes$Message$BonedancerPage = {ctor: 'BonedancerPage'};
var _Ragamuffine$daoc_patch_notes$Message$BlademasterPage = {ctor: 'BlademasterPage'};
var _Ragamuffine$daoc_patch_notes$Message$BerserkerPage = {ctor: 'BerserkerPage'};
var _Ragamuffine$daoc_patch_notes$Message$BardPage = {ctor: 'BardPage'};
var _Ragamuffine$daoc_patch_notes$Message$BainsheePage = {ctor: 'BainsheePage'};
var _Ragamuffine$daoc_patch_notes$Message$ArmsmanPage = {ctor: 'ArmsmanPage'};
var _Ragamuffine$daoc_patch_notes$Message$AnimistPage = {ctor: 'AnimistPage'};
var _Ragamuffine$daoc_patch_notes$Message$HiberniaPage = {ctor: 'HiberniaPage'};
var _Ragamuffine$daoc_patch_notes$Message$MidgardPage = {ctor: 'MidgardPage'};
var _Ragamuffine$daoc_patch_notes$Message$AlbionPage = {ctor: 'AlbionPage'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix4_Page = {ctor: 'Patch_1_122B_HotFix4_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix3_Page = {ctor: 'Patch_1_122B_HotFix3_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix2_Page = {ctor: 'Patch_1_122B_HotFix2_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix_Page = {ctor: 'Patch_1_122B_HotFix_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_Page = {ctor: 'Patch_1_122B_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_121C_Page = {ctor: 'Patch_1_121C_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_121B_Page = {ctor: 'Patch_1_121B_Page'};
var _Ragamuffine$daoc_patch_notes$Message$Patch_1_121_Page = {ctor: 'Patch_1_121_Page'};
var _Ragamuffine$daoc_patch_notes$Message$TopPage = {ctor: 'TopPage'};

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _Ragamuffine$daoc_patch_notes$Style$make_content = function (content) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-5-6'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'margin-top', _1: '40px'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'margin-left', _1: 'auto'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'margin-right', _1: 'auto'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'margin-bottom', _1: '40px'},
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$article,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('uk-article'),
					_1: {ctor: '[]'}
				},
				content),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$i,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('uk-icon-home uk-icon-large home-button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$TopPage),
							_1: {ctor: '[]'}
						}
					},
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
};
var _Ragamuffine$daoc_patch_notes$Style$make_top_content = function (content) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-5-6'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'margin-top', _1: '40px'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'margin-left', _1: 'auto'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'margin-right', _1: 'auto'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'margin-bottom', _1: '40px'},
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$article,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('uk-article'),
					_1: {ctor: '[]'}
				},
				content),
			_1: {ctor: '[]'}
		});
};
var _Ragamuffine$daoc_patch_notes$Style$sec_template = F2(
	function (color, message) {
		return A2(
			_elm_lang$html$Html$h3,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'border-left',
							_1: A2(_elm_lang$core$Basics_ops['++'], '3px solid ', color)
						},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'padding-left', _1: '6px'},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(message),
				_1: {ctor: '[]'}
			});
	});
var _Ragamuffine$daoc_patch_notes$Style$color_common = '#cc9900';
var _Ragamuffine$daoc_patch_notes$Style$seccommon = _Ragamuffine$daoc_patch_notes$Style$sec_template(_Ragamuffine$daoc_patch_notes$Style$color_common);
var _Ragamuffine$daoc_patch_notes$Style$color_hib = '#00e64d';
var _Ragamuffine$daoc_patch_notes$Style$sechib = _Ragamuffine$daoc_patch_notes$Style$sec_template(_Ragamuffine$daoc_patch_notes$Style$color_hib);
var _Ragamuffine$daoc_patch_notes$Style$color_mid = '#00afee';
var _Ragamuffine$daoc_patch_notes$Style$secmid = _Ragamuffine$daoc_patch_notes$Style$sec_template(_Ragamuffine$daoc_patch_notes$Style$color_mid);
var _Ragamuffine$daoc_patch_notes$Style$color_alb = '#cc0000';
var _Ragamuffine$daoc_patch_notes$Style$secalb = _Ragamuffine$daoc_patch_notes$Style$sec_template(_Ragamuffine$daoc_patch_notes$Style$color_alb);
var _Ragamuffine$daoc_patch_notes$Style$sec = function (s) {
	return A2(
		_elm_lang$html$Html$h3,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'border-left', _1: '3px solid #e6e600'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'padding-left', _1: '6px'},
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(s),
			_1: {ctor: '[]'}
		});
};
var _Ragamuffine$daoc_patch_notes$Style$ulist = function (l) {
	return A2(
		_elm_lang$html$Html$ul,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('uk-list uk-list-striped'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$List$map,
			function (s) {
				return A2(
					_elm_lang$html$Html$li,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(s),
						_1: {ctor: '[]'}
					});
			},
			l));
};

var _Ragamuffine$daoc_patch_notes$Animist$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('アニミスト 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Creeping Path (スペック)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('単体AFデバフの値は以下のように変更される。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
					{
						ctor: '::',
						_0: 'Level 30 - Spoil Armor - 50 から 100 に増加',
						_1: {
							ctor: '::',
							_0: 'Level 40 - Decompose Armor - 100 から 165 に増加',
							_1: {
								ctor: '::',
								_0: 'Level 49 - Decay Armor - 150 から 250 に増加',
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Animist$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('アニミスト 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('打ちっぱなし型の turret pet の詠唱時間は5秒から3.5秒に減少する。controlled pet は依然5秒のままである。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Animist$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('アニミスト 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('アニミストはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Arboreal Path (基本)'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
					{
						ctor: '::',
						_0: 'level 45 lifedrain のダメージを164から179に増加させる。',
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Arboreal Mastery (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('動きは遅いが大ダメージの bomber を追加する。この bomber は破壊が可能。また stun で止めることも可能。confuse で破壊される。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('1875 range, 詠唱時間5秒、再使用2分、持続時間5分、quickcast不可.'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 13 - Heavy Spirit. 99 body damage.',
										_1: {
											ctor: '::',
											_0: 'Level 23 - Plump Spirit. 199 body damage.',
											_1: {
												ctor: '::',
												_0: 'Level 33 - Inflated Spirit. 329 body damage.',
												_1: {
													ctor: '::',
													_0: 'Level 45 - Bulging Spirit. 499 body damage.',
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Creeping Mastery (スペック)'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('AoE root の距離を 1500 から 1875 に延長する。'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('Body resistance debuff, PBAoE melee DPS debuff ペットを除去する。'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('新しい damage bomber スペルを追加'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 7 - Spirit of Deceit - 2.8s cast - 1500 range - 34 matter damage - 5 power cost',
															_1: {
																ctor: '::',
																_0: 'Level 16 - Spirit of Cunning - 2.8s cast - 1500 range - 68 matter damage - 10 power cost',
																_1: {
																	ctor: '::',
																	_0: 'Level 27 - Spirit of Trickery - 2.8s cast - 1500 range - 122 matter damage - 13 power cost',
																	_1: {
																		ctor: '::',
																		_0: 'Level 38 - Spirit of Deception - 2.8s cast - 1500 range - 153 matter damage - 25 power cost',
																		_1: {
																			ctor: '::',
																			_0: 'Level 47 - Spirit of Guile - 2.8s cast - 1500 range - 199 matter damage - 31 power cost',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('新しい ground-targeted の healing shroom を追加'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 9 - Grove Sibyl - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 20 hit point heal, 850 range',
																	_1: {
																		ctor: '::',
																		_0: 'Level 21 - Grove Augur - 5s cast - 1500 range - 120秒間継続 - 38 power cost - 55 hit point heal, 850 range',
																		_1: {
																			ctor: '::',
																			_0: 'Level 32 - Grove Oracle - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 100 hit point heal, 850 range',
																			_1: {
																				ctor: '::',
																				_0: 'Level 42 - Grove Druid - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 215 hit point heal, 850 range',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しい ground-targeted の diseasing shroom を追加'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 5 - Forest\'s Blight - 5s cast - 1500 range - 120秒間継続 - 8 power cost - 10秒間 disease(850 range, 5 str debuff, 3% snare)',
																			_1: {
																				ctor: '::',
																				_0: 'Level 14 - Forest\'s Curse - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 15秒間 disease(850 range, 10 str debuff, 6% snare)',
																				_1: {
																					ctor: '::',
																					_0: 'Level 20 - Forest\'s Scourge - 5s cast - 1500 range - 120秒間継続 - 34 power cost - 30秒間 disease(850 range, 15 str debuff, 9% snare)',
																					_1: {
																						ctor: '::',
																						_0: 'Level 31 - Forest\'s Torment - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 30秒間 disease(850 range, 20 str debuff, 12% snare)',
																						_1: {
																							ctor: '::',
																							_0: 'Level 41 - Forest\'s Menace - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 30秒間 disease(850 range, 25 str debuff, 15% snare)',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい instant-cast, ground-targeted の healing shroom を追加'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 50 - Shroom of Life - instant cast - 10秒間継続 - 30 power - 400 pbaoe hit point heal, 350 range',
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('AoE root スペルの射程は延長される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 12 - 1500 range',
																							_1: {
																								ctor: '::',
																								_0: 'Level 18 - 1575 range',
																								_1: {
																									ctor: '::',
																									_0: 'Level 26 - 1655 range',
																									_1: {
																										ctor: '::',
																										_0: 'Level 34 - 1765 range',
																										_1: {
																											ctor: '::',
																											_0: 'Level 44 - 1875 range',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Creeping spec にある body resistance debuff/PBAoE melee DPS debuff ペットは削除される。'),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Animist$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Animist$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Animist$patch_1_121C, _Ragamuffine$daoc_patch_notes$Animist$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Armsman$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('アームズマン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('長柄'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 25 - Phalanx - Rear - ダメージ増加',
					_1: {
						ctor: '::',
						_0: 'Level 34 - Defender\'s Rage - Anytime - ダメージ減少',
						_1: {
							ctor: '::',
							_0: 'Level 39 - Poleaxe - Side - ダメージやや増加',
							_1: {
								ctor: '::',
								_0: 'Level 44 - Defender\'s Revenge - Phalanx - ダメージ増加',
								_1: {
									ctor: '::',
									_0: 'Level 50 - Defender\'s Aegis - Poleaxe - ダメージ増加',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$secalb('両手'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 34 - Obfuscate - Anytime - スタイルダメージやや減少',
							_1: {
								ctor: '::',
								_0: 'Level 44 - Two Moons - Onslaught - スタイルダメージ増加',
								_1: {
									ctor: '::',
									_0: 'Level 50 - Sun and Moon - Doubler - スタイルダメージ増加',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Armsman$all = _Ragamuffine$daoc_patch_notes$Armsman$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Bainshee$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バンシー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('バンシーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Spectral Guard (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しく AoE cone slow 呪文が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 7 - Slowing Scream - 詠唱2.5秒 - 700 range cone  - 持続時間15秒 - 11 power - slow 10%',
							_1: {
								ctor: '::',
								_0: 'Level 17 - Slowing Shriek - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 23 power - slow 20%',
								_1: {
									ctor: '::',
									_0: 'Level 27 - Slowing Shrill - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 35 power - slow 30%',
									_1: {
										ctor: '::',
										_0: 'Level 37 - Slowing Wail - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 50 power - slow 50%',
										_1: {
											ctor: '::',
											_0: 'Level 47 - Slowing Cry - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 62 power - slow 75%',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('レベル47 AoE cone root はレベル46に移動する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Ethereal Shriek (スペック)'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('このラインの呪文は再調整される。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('弓ダメージ吸収オーラは削除される。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('AoE cold DD スペルのレベルは 1, 11, 21, 31, 41 となる。威力は変わらない。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('AoE nearsight のレベルは 2, 12, 22, 32, 42 となる。威力は変わらない。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('AoE Dexterity/Quickness debuff のレベルは 3, 13, 23, 33, 43 となる。威力は変わらない。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('AoE Bolt のレベルは 5, 15, 25, 45 となる。威力は変わらない。レベル45の AoE bolt Deafening Cascade のダメージは296から315に増加する。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$br,
																				{ctor: '[]'},
																				{ctor: '[]'}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('単体 cold direct damage スペルのレベルは 7, 17, 27, 37, 47 となる。威力は変わらない。'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しく単体ペット fear (退散後に60秒の無効時間が発生する)が追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 8 - Fear Minion - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																								_1: {
																									ctor: '::',
																									_0: 'Level 18 - Expel Minion - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																									_1: {
																										ctor: '::',
																										_0: 'Level 28 - Intimidate Minion - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																										_1: {
																											ctor: '::',
																											_0: 'Level 38 - Daunt Minion - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																											_1: {
																												ctor: '::',
																												_0: 'Level 48 - Terrify Minion - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バンシー 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('バンシーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('pulsing AoE nearsight は Ethereal Shriek スペックに戻される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 2 - Vanquish Sight - 2.0 sec cast - 1800 range - 200 radius - 4 power (+2/tick)',
							_1: {
								ctor: '::',
								_0: 'Level 12 - Abolish Sight - 2.0 sec cast - 1850 range - 250 radius - 7 power (+5/tick)',
								_1: {
									ctor: '::',
									_0: 'Level 22 - Eliminate Sight - 2.0 sec cast - 1900 range - 300 radius - 12 power (+7/tick)',
									_1: {
										ctor: '::',
										_0: 'Level 32 - Purge Sight - 2.0 sec cast - 1950 range - 350 radius - 16 power (+9/tick)',
										_1: {
											ctor: '::',
											_0: 'Level 42 - Expel Sight - 2.0 sec cast - 2000 range - 400 radius - 20 power (+12/tick)',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('以下のスペルは削除されていたが 1.121 で記載漏れしていた。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Befriend',
									_1: {
										ctor: '::',
										_0: 'PBAoE Acuity shear',
										_1: {
											ctor: '::',
											_0: 'Fear',
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バンシー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('バンシーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Spectral Guard (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('single target root は Spectral Force に移される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Spectral Force (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('group pulse magic ablative chant は以下のように変更になる。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('single target 100% magic ablative. 2.8 sec cast, 再使用60秒, 30秒継続. 自分には詠唱できない。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Audible Barrier, Level 20, 300 magic damage 吸収, Level 30 から 20 に変更',
											_1: {
												ctor: '::',
												_0: 'Tumultuous Barrier, Level 30, 375 magic damage 吸収, Level 40 から 30 に変更',
												_1: {
													ctor: '::',
													_0: 'Resounding Barrier, level 40, 500 magic damage 吸収, Level 50 から 40 に変更',
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('single target root がレベル 6, 12, 21, 28, 35, 43, 49 に追加される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Phantasmal Wail (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('single target Dex-Qui debuff / body DDスペルは AoE body DD / 10% body debuff スペルに変更になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 3 - 3 body damage, 350 半径',
															_1: {
																ctor: '::',
																_0: 'Level 7 - 25 body damage, 350 半径',
																_1: {
																	ctor: '::',
																	_0: 'Level 13 - 44 body damage, 350 半径',
																	_1: {
																		ctor: '::',
																		_0: 'Level 19 - 64 body damage, 350 半径',
																		_1: {
																			ctor: '::',
																			_0: 'Level 27 - 89 body damage, 350 半径',
																			_1: {
																				ctor: '::',
																				_0: 'Level 35 - 110 body damage, 350 半径',
																				_1: {
																					ctor: '::',
																					_0: 'Level 43 - 120 body damage, 350 半径',
																					_1: {
																						ctor: '::',
																						_0: 'Level 48 - 141 body damage, 350 半径',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('single target shear が追加される。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 33 - Strength shear',
																	_1: {
																		ctor: '::',
																		_0: 'Level 34 - Constitution shear',
																		_1: {
																			ctor: '::',
																			_0: 'Level 36 - Dexterity shear',
																			_1: {
																				ctor: '::',
																				_0: 'Level 37 - Acuity shear',
																				_1: {
																					ctor: '::',
																					_0: 'Level 38 - Str/Con shear',
																					_1: {
																						ctor: '::',
																						_0: 'Level 39 - Dex/Qui shear',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しい single target random shear が追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 50 - 再使用2分, 1500 range, 4s キャスト時間',
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Ethereal Shriek (スペック)'),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('新しい single target cold DD が追加される。'),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																					{
																						ctor: '::',
																						_0: 'Level 7 - Frosty Torment - 2.8s cast - 1500 range - 4 power - 34 cold damage',
																						_1: {
																							ctor: '::',
																							_0: 'Level 17 - Bleak Torment - 2.8s cast - 1500 range - 9 power - 68 cold damage',
																							_1: {
																								ctor: '::',
																								_0: 'Level 27 - Chilled Torment - 2.8s cast - 1500 range - 17 power - 122 cold damage',
																								_1: {
																									ctor: '::',
																									_0: 'Level 37 - Icy Torment - 2.8s cast - 1500 range - 22 power - 153 cold damage',
																									_1: {
																										ctor: '::',
																										_0: 'Level 47 - Frigid Torment - 2.8s cast - 1500 range - 29 power - 199 cold damage',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('AoE DD と AoE bolt の属性は body から cold に変更される。'),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$br,
																							{ctor: '[]'},
																							{ctor: '[]'}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('新しくペットを追い払う AoE スペルが追加される。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Level 50 - 1250 半径 - 20秒間継続 - 5s cast time - 再使用5分',
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('新しい single target mesmerization cure が追加される。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Level 26 - Alarming Screech - 3s cast time - 1500 range - 6% power cost',
																												_1: {ctor: '[]'}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bainshee$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121B, _Ragamuffine$daoc_patch_notes$Bainshee$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Bard$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バード 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 45 - Superior Skin of the Redwood - AF の値は 55 から 150 に増加する。'),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bard$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バード 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('バードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Regrowth (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Music (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい speed buff を追加'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Crescendo, realm target, instant-cast, 7秒間継続, 130% speed buff, 34 Music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
									_1: {
										ctor: '::',
										_0: 'Great Crescendo, realm target, instant-cast, 9秒間継続, 160% speed buff, 44 music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (スペック)'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('resist song は新しい single target resistance buff に置き換えられる。このレジストは CL バフ、Druid/Warden のレジストバフとスタックしない。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 27 - Hymn of Soul Guarding - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを8%増加',
												_1: {
													ctor: '::',
													_0: 'Level 46 - Hymn of Soul Protection - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを12%増加',
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bard$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Bard$patch_1_121, _Ragamuffine$daoc_patch_notes$Bard$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Berserker$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('バーサーカー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('バーサーカーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('バーサーカーはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('バーサーカーはレベル 50 で壁を登る能力 Climbing Spikes を得る。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('バーサーカーのレルムアビリティーからチャージがなくなる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('バーサーカーはレベル上昇に伴ってチャージを習得する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 30 - Charge 1',
									_1: {
										ctor: '::',
										_0: 'Level 35 - Charge 2',
										_1: {
											ctor: '::',
											_0: 'Level 40 - Charge 3',
											_1: {
												ctor: '::',
												_0: 'Level 45 - Charge 4',
												_1: {
													ctor: '::',
													_0: 'Level 50 - Charge 5',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Light Tank Stances'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。'),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$dl,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('uk-description-list-horizontal'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$dt,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('War Stance'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$dd,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$dt,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('Wild Stance'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$dd,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$dt,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Frenzy Stance'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$dd,
																		{ctor: '[]'},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Left Axe (スペック)'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Level 4 - Doubler - Front - 16% 攻撃速度低下、ダメージやや増加',
														_1: {
															ctor: '::',
															_0: 'Level 12 - Atrophy - Ravager - 21%, 20秒攻撃速度低下',
															_1: {
																ctor: '::',
																_0: 'Level 21 - Scathing Blade - Doubler - 12秒 hinder',
																_1: {
																	ctor: '::',
																	_0: 'Level 29 - Snowsquall - Rear - スネアはなくなる, ダメージやや増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 34 - Doublefrost - Anytime - ダメージやや減少',
																		_1: {
																			ctor: '::',
																			_0: 'Level 39 - Frosty Gaze - Comeback - ダメージ増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 44 - Icy Brilliance - Snowsquall - 7秒スタン, ダメージやや増加',
																				_1: {
																					ctor: '::',
																					_0: 'Level 50 - Aurora Borealis - Side - ダメージやや増加',
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Axe (スペック)'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 15 - Evernight - Rear - スネアはなくなる, ダメージやや増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 29 - Havoc - Anytime - ダメージやや減少',
																	_1: {
																		ctor: '::',
																		_0: 'Level 39 - Glacial Movement - Side - ダメージ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 44 - Arctic Rfit - Evernight - ダメージ増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 50 - Tyr\'s Fury - Glacial Movement - ダメージやや増加',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hammer (スペック)'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 18 - Demolish - Frost Hammer - ダメージ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 29 - Conquer - Rear - スネアはなくなる, ダメージやや増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 32 - Comminute - Anytime - ダメージ減少',
																				_1: {
																					ctor: '::',
																					_0: 'Level 44 - Sledgehammer - Conquer - ダメージ増加',
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'Level 15 - Aurora - Northern Lights followup - Damage increased slightly',
																				_1: {
																					ctor: '::',
																					_0: 'Level 29 - Rush - Parry reactionary followup is now a first-in-chain side positional - 21% 攻撃速度低下 effect replaced with a 15s hinder',
																					_1: {
																						ctor: '::',
																						_0: 'Level 34 - Polar Rift - Anytime - ダメージ減少',
																						_1: {
																							ctor: '::',
																							_0: 'Level 50 - Ragnarok - Rear - スネアはなくなる, ダメージ増加',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Berserker$all = _Ragamuffine$daoc_patch_notes$Berserker$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Blademaster$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ブレードマスター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ブレードマスターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ブレードマスターはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('ブレードマスターのレルムアビリティーからチャージがなくなる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('ブレードマスターはレベル上昇に伴ってチャージを習得する。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 30 - Charge 1',
								_1: {
									ctor: '::',
									_0: 'Level 35 - Charge 2',
									_1: {
										ctor: '::',
										_0: 'Level 40 - Charge 3',
										_1: {
											ctor: '::',
											_0: 'Level 45 - Charge 4',
											_1: {
												ctor: '::',
												_0: 'Level 50 - Charge 5',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Light Tank Stances'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$dl,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('uk-description-list-horizontal'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$dt,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('Balanced Blades'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$dd,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$dt,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Punishing Blades'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$dd,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$dt,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Dancing Blades'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$dd,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Celtic Dual (スペック)'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 15 - Thunderstorm - Detaunt anytime - Defensive bonus とスタイルダメージを他の detaunt スタイル並に減少',
													_1: {
														ctor: '::',
														_0: 'Level 21 - Hurricane - Rear - スネアはなくなる, ダメージ増加',
														_1: {
															ctor: '::',
															_0: 'Level 29 - Tempest - Ice Storm - ダメージ増加',
															_1: {
																ctor: '::',
																_0: 'Level 34 - Meteor Shower - Anytime - ダメージ減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 44 - Twin Star - Tornado - ダメージ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 50 - Supernova - Hurricane - 7秒スタン, スタイルダメージ増加',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blunt (スペック)'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 25 - Back Crush - Rear - スネアはなくなる, ダメージやや増加',
															_1: {
																ctor: '::',
																_0: 'Level 34 - Mauler - Anytime - ダメージ減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 39 - Stunning Blow - Parry - 15秒 hinder',
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Pierce (スペック)'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 12 - Black Widow - Rear - スネアはなくなる, ダメージやや増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 34 - Asp’s Bite - Anytime - ダメージ減少',
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blades (スペック)'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 34 - Revenging Blade - Rear - スネアはなくなる, ダメージやや増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 44 - Prismatic Blade - Anytime - ダメージ減少',
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Blademaster$all = _Ragamuffine$daoc_patch_notes$Blademaster$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ボーンダンサー 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ドレッドロードの魔法抵抗はやや減少する。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('fossil healer の回復量はやや減少する。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ボーンダンサー 1.122B Hot Fix'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('トーテムは以下のように変更になる。出現するトーテムは一本のみであるが半径内に効果がある。トーテムの効果は詠唱後すぐに有効になりその後は通常どおりパルスが続く。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ボーンダンサー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ボーンダンサーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Darkness (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('cold DD/snare 呪文は以下のように調整される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 1 - Stiffen Skeleton - 2.8s cast - 1500 range - 6 power - 24 cold damage and 5% snare.',
							_1: {
								ctor: '::',
								_0: 'Level 11 - Solidify Skeleton - 2.8s cast - 1500 range - 14 power - 58 cold damage and 10% snare.',
								_1: {
									ctor: '::',
									_0: 'Level 21 - Calcify Skeleton - 2.8s cast - 1500 range - 30 power - 112 cold damage and 15% snare.',
									_1: {
										ctor: '::',
										_0: 'Level 31 - Ossify Skeleton - 2.8s cast - 1500 range - 46 power - 141 cold damage and 25% snare.',
										_1: {
											ctor: '::',
											_0: 'Level 41 - Crystallize Skeleton - 2.8s cast - 1500 range - 55 power - 189 cold damage and 35% snare.',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('body debuff は以下のように調整される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 2 - Assist Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 5%',
									_1: {
										ctor: '::',
										_0: 'Level 12 - Improve Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 10%',
										_1: {
											ctor: '::',
											_0: 'Level 22 - Boost Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 15%',
											_1: {
												ctor: '::',
												_0: 'Level 32 - Support Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 30%',
												_1: {
													ctor: '::',
													_0: 'Level 42 - Bolster Bonecaster - Instant cast - 1500 range - 持続時間15秒 - 再使用5秒 - 10% power - body debuff 50%',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しい打ちっぱなし型のペットが追加される。これらのペットに攻撃されても妨害されない。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 6 - Bone Phantoms - 2s cast - 1250 range - 15秒ごと - 15% power + 5/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 12 cold damage の攻撃を行いその後消滅する。同時に一体のみ。',
											_1: {
												ctor: '::',
												_0: 'Level 16 - Bone Ghasts - 2s cast - 1250 range - 15秒ごと - 15% power + 15/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 25 cold damage の攻撃を行いその後消滅する。同時に一体のみ。',
												_1: {
													ctor: '::',
													_0: 'Level 26 - Bone Spirits - 2s cast - 1250 range - 10秒ごと - 15% power + 30/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 90 cold damage の攻撃を行いその後消滅する。同時に一体のみ。',
													_1: {
														ctor: '::',
														_0: 'Level 36 - Bone Haunts - 2s cast - 1250 range - 10秒ごと - 15% power + 50/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 175 cold damage の攻撃を行いその後消滅する。同時に二体まで。',
														_1: {
															ctor: '::',
															_0: 'Level 46 - Bone Revenants - 2s cast - 1250 range - 5秒ごと - 15% power + 70/tick - fossil phantom を召喚する。fossil phantom は 1500 unit 内の敵に 300 cold damage の攻撃を行いその後消滅する。同時に三体まで。',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('direct damage totem は以下のように変更になる。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 4 - Dusk Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに 35 cold damage',
													_1: {
														ctor: '::',
														_0: 'Level 14 - Gloom Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに66 cold damage',
														_1: {
															ctor: '::',
															_0: 'Level 24 - Murk Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに109 cold damage',
															_1: {
																ctor: '::',
																_0: 'Level 34 - Shadow Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに162 cold damage',
																_1: {
																	ctor: '::',
																	_0: 'Level 44 - Obsidian Totem - Instant Cast - 再使用30秒 - 1500 range - 半径300 - 持続時間30秒 - 10% power - 範囲内の敵16体まで3秒ごとに 252 cold damage',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('トーテム呪文は地面上のターゲットに設置する呪文である。すべてのトーテム呪文はタイマーを共有し、同時に一つのみ有効である。spell duration ボーナスは設置呪文には影響しない。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('新しい concentration 型トーテムが追加される。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 50 - Sable Totem - Instant cast - 持続時間10秒 - 再使用5分 - 半径200 - 10% power - トーテムの範囲内にいる最大8人までの味方は呪文を妨害されない。',
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('commander pet 召喚呪文は以下のように名前も含めて変更される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 40 - Summon Dread Lich - 6s cast - 40% power - Dread Guardian を召喚する。',
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Dread Lich は以下のように変更になる。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'このペットは常に code/snare DD を使うようになる。',
																					_1: {
																						ctor: '::',
																						_0: 'ダメージは脅威的なレベルまで増加する。',
																						_1: {
																							ctor: '::',
																							_0: '単体 disease は除去される。',
																							_1: {
																								ctor: '::',
																								_0: '単体 DD/debuff は除去される。',
																								_1: {
																									ctor: '::',
																									_0: 'スネアは 35% から 40% になる。',
																									_1: {
																										ctor: '::',
																										_0: '召喚時に魔法ダメージ増加自己バフを詠唱する。',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Suppression (スペック)'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しく disarm の能力が追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 1 - Punish Combatant - Instant cast - 1500 range - 持続時間1秒 - 再使用1分 - 20% power - ターゲットは3秒間物理攻撃ができない',
																								_1: {
																									ctor: '::',
																									_0: 'Level 11 - Punish Assailant - Instant cast - 1500 range - 持続時間3秒 - 再使用1分 - 20% power - ターゲットは5秒間物理攻撃ができない',
																									_1: {
																										ctor: '::',
																										_0: 'Level 21 - Punish Aggressor - Instant cast - 1500 range - 持続時間5秒 - 再使用1分 - 20% power - ターゲットは7秒間物理攻撃ができない',
																										_1: {
																											ctor: '::',
																											_0: 'Level 31 - Punish Opponent - Instant cast - 1500 range - 持続時間7秒 - 再使用1分 - 20% power - ターゲットは9秒間物理攻撃ができない',
																											_1: {
																												ctor: '::',
																												_0: 'Level 41 - Punish Soldier - Instant cast - 1500 range - 持続時間9秒 - 再使用1分 - 20% power - ターゲットは11秒間物理攻撃ができない',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('AoE スネア DD のスペルは以下のように変更になる。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Level 3 - Shroud of Uncertainty - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 5 power - 8 body damage 10% snare.',
																										_1: {
																											ctor: '::',
																											_0: 'Level 13 - Shroud of Doubt - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 14 power - 44 body damage 20% snare.',
																											_1: {
																												ctor: '::',
																												_0: 'Level 23 - Shroud of Fear - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 25 power - 78 body damage 30% snare.',
																												_1: {
																													ctor: '::',
																													_0: 'Level 33 - Shroud of Despair - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 30 power - 95 body damage 40% snare.',
																													_1: {
																														ctor: '::',
																														_0: 'Level 43 - Shroud of Cowardice - 詠唱3秒 - 1500 range - 半径350 - 持続時間30秒 - 39 power - 111 body damage 50% snare.',
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('グループABSバフは以下のように変更になる。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Level 5 - Harden Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +1.',
																												_1: {
																													ctor: '::',
																													_0: 'Level 15 - Toughen Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +2.',
																													_1: {
																														ctor: '::',
																														_0: 'Level 25 - Strengthen Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +3.',
																														_1: {
																															ctor: '::',
																															_0: 'Level 35 - Augment Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +6.',
																															_1: {
																																ctor: '::',
																																_0: 'Level 45 - Bolster Bone Army - 詠唱10秒 - 1500 range - 持続時間10分 - 15% power - ABS +9.',
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('snare トーテムは slow トーテムに変更される。'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'Level 7 - Slowing Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 20 power - 範囲内の敵を最大8体まで2秒間 10% slow',
																														_1: {
																															ctor: '::',
																															_0: 'Level 17 - Crawling Ground - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 30 power - 範囲内の敵を最大8体まで2秒間 20% slow',
																															_1: {
																																ctor: '::',
																																_0: 'Level 27 - Bone Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 45 power - 範囲内の敵を最大8体まで2秒間 40% slow',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 37 - Hindering Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 62 power - 範囲内の敵を最大8体まで2秒間 55% slow',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 47 - Grasping Totem - Instant cast - 1000 range - 再使用30秒 - 4秒ごと - 250 radius - 持続時間30秒 - 75 power - 範囲内の敵を最大8体まで2秒間 75% slow',
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('トーテム呪文は設置型である。'),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('すべてのトーテム呪文はタイマーを共有し、同時に一つのみ有効である。呪文持続時間延長ボーナスは設置型呪文には無効である。'),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_elm_lang$html$Html$br,
																																{ctor: '[]'},
																																{ctor: '[]'}),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('単体ライフタップ呪文は以下のように調整される。'),
																																_1: {
																																	ctor: '::',
																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																		{
																																			ctor: '::',
																																			_0: 'Level 9 - Crush Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 27 body damage ダメージの80%吸収',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Level 19 - Crunch Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 58 body damage ダメージの80%吸収',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 29 - Powder Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 77 body damage ダメージの80%吸収',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 39 - Disintegrate Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 97 body damage ダメージの80%吸収',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 49 - Pulverize Skeleton - Instant cast - 1500 range - 再使用8秒 - 10% power - 123 body damage ダメージの80%吸収',
																																							_1: {ctor: '[]'}
																																						}
																																					}
																																				}
																																			}
																																		}),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('新しく物理ダメージ吸収トーテムが追加される。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																				{
																																					ctor: '::',
																																					_0: 'Level 50 - Protection Totem - Instant Cast - 持続時間15秒 - 再使用5分 - 250 radius - 10% power - 味方最大8体まで 350 ポイントの melee ablative を連続的に付与する。',
																																					_1: {ctor: '[]'}
																																				}),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('コマンダーペットの名前は変更される。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																						{
																																							ctor: '::',
																																							_0: 'Level 40 - Summon Dread Guardian - 詠唱6秒 - 40% power - Dread Guardian を召喚する。召喚時にHP再生自己バフを詠唱する。単体ライフタップは除去され spirit DD が追加される。spirit DD は同時に 40% spirit regist デバフを行う。power 再生バフは削除される。召喚時に ABS と AF の自己バフを詠唱する。他のグループメンバーをヒールできるが passive 状態でなければならない。そうでなければ敵を攻撃する。常にスタッフを装備している。',
																																							_1: {ctor: '[]'}
																																						}),
																																					_1: {
																																						ctor: '::',
																																						_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Bone Army (基本)'),
																																						_1: {
																																							ctor: '::',
																																							_0: _elm_lang$html$Html$text('コマンダーは以下のように調整される。'),
																																							_1: {
																																								ctor: '::',
																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																									{
																																										ctor: '::',
																																										_0: 'Level 1 - Summon Bone Boss- 詠唱6秒 - 20% power - 合計レベル3のサブペットを支配できるコマンダーを召喚する。',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Level 6 - Summon Bone Squire - 詠唱6秒 - 20% power - 合計レベル15のサブペットを支配できるコマンダーを召喚する。',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Level 11 - Summon Bone Chieftain - 詠唱6秒 - 20% power - 合計レベル50のサブペットを支配できるコマンダーを召喚する。',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Level 16 - Summon Bone Squire Cadet - 詠唱6秒 - 20% power - 合計レベル75のサブペットを支配できるコマンダーを召喚する。',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 21 - Summon Bone Commander - 詠唱6秒 - 20% power - 合計レベル100のサブペットを支配できるコマンダーを召喚する。',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 31 - Summon Bone Master - 詠唱6秒 - 20% power - 合計レベル150のサブペットを支配できるコマンダーを召喚する。',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 41 - Summon Bone Captain - 詠唱6秒 - 20% power - 合計レベル100のサブペットを支配できるコマンダーを召喚する。',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Level 50 - Summon Commander - 詠唱6秒 - 20% power - 合計レベル150のサブペットを支配できるコマンダーを召喚する。',
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}),
																																								_1: {
																																									ctor: '::',
																																									_0: _elm_lang$html$Html$text('サブペットのレベルは常にマスターの82%となる。レベルによってはコマンダーは1体または2体までのサブペットしか召喚できない。40以上のレベルではコマンダーは最大3体のサブペットを召喚できる。'),
																																									_1: {
																																										ctor: '::',
																																										_0: A2(
																																											_elm_lang$html$Html$br,
																																											{ctor: '[]'},
																																											{ctor: '[]'}),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('より強力なペットに対応するため、単体ペット demezz はレベル27に移動する。'),
																																											_1: {
																																												ctor: '::',
																																												_0: A2(
																																													_elm_lang$html$Html$br,
																																													{ctor: '[]'},
																																													{ctor: '[]'}),
																																												_1: {
																																													ctor: '::',
																																													_0: _elm_lang$html$Html$text('単体ペットヒールは以下のように調整される。'),
																																													_1: {
																																														ctor: '::',
																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																															{
																																																ctor: '::',
																																																_0: 'Level 5 - Iron Bones - 詠唱3秒 - 2000 range - 4 power - 46回復',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Level 15 - Thicken Bones - 詠唱3秒 - 2000 range - 4 power - 81回復',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'Level 25 - Develop Bones - 詠唱3秒 - 2000 range - 4 power - 146回復',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: 'Level 35 - Restore Bones - 詠唱3秒 - 2000 range - 4 power - 201回復',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: 'Level 45 - Inure Bones - 詠唱3秒 - 2000 range - 4 power - 300回復',
																																																				_1: {ctor: '[]'}
																																																			}
																																																		}
																																																	}
																																																}
																																															}),
																																														_1: {
																																															ctor: '::',
																																															_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Bone Army (スペック)'),
																																															_1: {
																																																ctor: '::',
																																																_0: _elm_lang$html$Html$text('Bone Army はボーンダンサーのすべてのサブペットが含まれている。サブペットのレベルは常にマスターのレベルの82%となる。つまりレベル1の Bone Defender はレベル50のプレイヤーから見て青となる。Bone Army のスペックには影響されない。'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: A2(
																																																		_elm_lang$html$Html$br,
																																																		{ctor: '[]'},
																																																		{ctor: '[]'}),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _elm_lang$html$Html$text('新しいサブペットが追加される。これらのサブペットは以前は Darkness, Suppression, Bone Army スペックに属していた。'),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																				{
																																																					ctor: '::',
																																																					_0: 'Level 1 - Summon Bone Defender - 詠唱6秒 - 35% power - fossil defender を召喚する。物理的な力は弱いがダメージ吸収に特化している。移動速度は遅い。',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: 'Level 5 - Summon Bone Guardian - 詠唱6秒 - 35% power - fossil guardian を召喚する。自己および仲間のサブペットを強化する。ヘイストバフは15% celerity バフになる。常にスタッフを装備する。',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: 'Level 11 - Summon Bone Deadeye - 詠唱6秒 - 35% power - fossil archer を召喚する。弓を使って遠距離攻撃を行う。',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'Level 15 - Summon Bone Mender - 詠唱6秒 - 35% power - fossil healer を召喚する。自己および仲間のサブペットをヒールする。これらのペットはボーンダンサーのHPが90%になるとヒールを行う。ヒール量は増加している。ヘルス regen バフは修正されている。3秒ごとに 75 の回復を行う。',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'Level 21 - Summon Bone Spellbinder - fossil conjuror を召喚する。spirit 属性の魔法攻撃を行う。',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: 'Level 25 - Summon Bone Soldier - 詠唱6秒 - 35% power - fossil solider を召喚する。強力な両手物理攻撃を行うが魔法攻撃には弱い。',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'Level 30 - Summon Bone Hexer - fossil seer を召喚する。敵を弱体化させる魔法を使う。病気のみを詠唱し指示されない限り物理攻撃は行わない。',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'Level 35 - Summon Bone Warmage - fossil mystic を召喚する。slow 効果を持つ cold DD で攻撃する。',
																																																												_1: {ctor: '[]'}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _elm_lang$html$Html$text('新しいコマンダーが追加される。'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																						{
																																																							ctor: '::',
																																																							_0: 'Level 40 - Summon Dread Guardian - 詠唱6秒 - 40% power - Dread Guardian を召喚する。召喚時に自己ヘルス regen バフを詠唱する。このバフはリリース時に除去される。spirit DD で敵を攻撃する。この DD には 40% レジストデバフの効果がある。単体ライフ吸収は削除されている。パワー回復バフは削除されている。召喚時に ABS バフと AF バフを詠唱する。グループメンバーをヒールするが passive 状態にしておく必要がある。このペットは敵への攻撃を優先する。常にスタッフを装備する。',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'Level 45 - Summon Dread Lich - 詠唱6秒 - 40% power - Dread Lich を召喚する。このペットは常にスネア cold DD で攻撃するようになる。ダメージは脅威となるように増加している。単体病気は削除されている。単体デバフ DD は削除された。スネア効果は 35% から 40% に増加している。召喚時に魔法ダメージ強化自己バフを詠唱する。',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'Level 50 - Summon Dread Lord - 詠唱6秒 - 65% power - このペットはレベル52であり最大5体のサブペットを保有できる。このペットは Mastery of Concentration 中の敵を一定確率で妨害できる。配下のサブペットに分散、アシストを指示できる。魔法ダメージに耐性を持つ。召喚時にフルバフされている。',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _elm_lang$html$Html$text('AoE DoT 呪文が追加された。'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																								{
																																																									ctor: '::',
																																																									_0: 'Level 2 - Liquify Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 18 power -12 body damage.',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: 'Level 12 - Render Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 30 power - 30 body damage.',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'Level 22 - Soften Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 42 power - 60 body damage.',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'Level 32 - Fade Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 3秒ごと - 50 power - 88 body damage.',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: 'Level 42 - Ruin Bones - 詠唱3秒 - 1500 range - 半径350 - 持続時間20秒 - 2.5秒ごと - 64 power - 131 body damage.',
																																																													_1: {ctor: '[]'}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _elm_lang$html$Html$text('インスタント単体 DD 呪文が追加された。'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																										{
																																																											ctor: '::',
																																																											_0: 'Level 8 - Familiar Dart - 3 body damage - 1250 range - 再使用15秒 - 20% power',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'Level 18 - Familiar Jolt - 18 body damage - 1250 range - 再使用15秒 - 20% power',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: 'Level 28 - Familiar Blast - 42 body damage - 1250 range - 再使用15秒 - 20% power',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: 'Level 38 - Familiar Burst - 62 body damage - 1250 range - 再使用15秒 - 20% power',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'Level 48 - Familiar Defeat - 86 body damage - 1250 range - 再使用15秒 - 20% power',
																																																															_1: {ctor: '[]'}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}),
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ボーンダンサー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ボーンダンサーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Bone Army (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい level 40 Skeletal Commander が追加される。Charge 能力を持つ。他のすべての Skeletal Commander から Charge 能力は除去される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Suppression (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('fossil guardian が cast する Shards of Bone damage-shield buff は除去される。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しいペット fossil conjurer が追加される。levels 34 と 44 の spirit DD スペルで攻撃を行う。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('single-target ABS buff は除去される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Bone Army (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('level 40 の Bone Army archer commander は level 50 に変更になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'commander は Bone Army General と呼ばれ level 50 から見て黄色になる。',
															_1: {
																ctor: '::',
																_0: 'commander は最大 4 ではなく 6 のペットをサポートできる。',
																_1: {
																	ctor: '::',
																	_0: 'commander はペットにアシストさせることもアシストさせないこともできる。',
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('いくつかの能力のレベルが変更になる。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Damage Add は level 50 から 48 になる。',
																	_1: {
																		ctor: '::',
																		_0: 'Fossil Warrior sub-pet は level 48 から 46 になる。',
																		_1: {
																			ctor: '::',
																			_0: 'Taunt は level 46 から 43 になる。',
																			_1: {
																				ctor: '::',
																				_0: 'Str/Con buff は level 43 から 40 になる。',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('すべての Bone Army melee sub pet は Charge 能力を失う。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('endurance/power drain totem の効果は 10% power / 25% endurance から 20% power / 50% endurance に増加する。吸収量はターゲットの現在の power/endurance である。最大値ではない。'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Bonedancer$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B,
		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix, _Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix2)));

var _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix4 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('カバリスト 1.121B Hot Fix #4'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Amber Simulacrum ペットの移動速度がやや低下する。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('カバリスト 1.121B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('amber simulacrum ペットの物理防御を低下させる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('カバリスト 1.121B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('カバリスト 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('カバリストはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Spirit Magic (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('ペットを対象としたバフ呪文はすべて削除される。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('ペットのレベルは召喚者のレベルと等しくなる。'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$br,
							{ctor: '[]'},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('新しいペットが追加される。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 1 - Amber Simulacrum - 詠唱6秒 - 40% power - このペットは物理攻撃に特化している。ペットの移動速度は増加している。このペットは True Strike を持ち 100% の確率で攻撃しブレードターンを貫通する。無条件のスタイル Magic Hammer は高ダメージで自己 celerity を proc する。このペットは高い確率で double attack を行う。被ダメージはやや減少している',
										_1: {
											ctor: '::',
											_0: 'Level 11 - Ruby Simulacrum - 詠唱6秒 - 40% power - DD スペルの詠唱時間は 2.5 秒から 2.2 秒に減少している。このペットは魔法攻撃に特化している。攻撃属性は body で body resist デバフも行う。このペットを妨害することはできない。',
											_1: {
												ctor: '::',
												_0: 'Level 21 - Sapphire Simulacrum - 詠唱6秒 - 40% power - このペットはサポート型でありカバリストのグループでの地位を回復する。このペットはグループの体力とスタミナを回復する。グループに health regen のバフをかける。passive にすればヒールし続ける。このペットを妨害することはできない。',
												_1: {
													ctor: '::',
													_0: 'Level 31 - Emerald Simulacrum - 詠唱6秒 - 40% power - このペットはハイブリッド攻撃に特化している。無条件スタイル Emerald Kick はターゲットを病気にし 40% のスネアと 35 ポイントの strength の低下を 9 秒間与える。背後スタイル Emerald Sprain は 40% のスネアを 14 秒間与える。',
													_1: {
														ctor: '::',
														_0: 'Level 41 - Jade Simulacrum - 詠唱6秒 - 40% power - このペットはタンクである。このペットの攻撃対象は物理ダメージが 30% 低下する。このペットはマスターのHPが低下すると自分のHPを使ってマスターをヒールする。',
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('単体ペット demezz 呪文はレベル25に移動された。'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('単体ペットヒールのレベルは以下のように変更になる。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 4 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 31回復',
													_1: {
														ctor: '::',
														_0: 'Level 14 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 71回復',
														_1: {
															ctor: '::',
															_0: 'Level 24 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 146回復',
															_1: {
																ctor: '::',
																_0: 'Level 34 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 201回復',
																_1: {
																	ctor: '::',
																	_0: 'Level 44 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 300回復',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Spirit Magic (スペック)'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('新しくペット犠牲スペルが追加される。simulacrum のパワーを吸収している間は新しいペットを召喚できない。'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 3 - Simulacrum\'s Soul - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少する。',
																_1: {
																	ctor: '::',
																	_0: 'Level 13 - Simulacrum\'s Fortitude - 詠唱5秒 - 持続時間10分 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。',
																	_1: {
																		ctor: '::',
																		_0: 'Level 23 - Simulacrum\'s Resilience - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。',
																		_1: {
																			ctor: '::',
																			_0: 'Level 33 - Simulacrum\'s Superiority - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。マスターを物理攻撃する者は 5秒間 10% の slow 状態になる。',
																			_1: {
																				ctor: '::',
																				_0: 'Level 43 - Simulacrum\'s Brilliance - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。マスターを物理攻撃する者は 5秒間 10% の slow 状態になる。すべての魔法ダメージが 15% 増加する。',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しくペット回収スペルが追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 1 - Convert Spirit - 詠唱3秒 - 500 range - 0 Power - 10 power 回復',
																		_1: {
																			ctor: '::',
																			_0: 'Level 11 - Convert Minion - 詠唱3秒 - 500 range - 0 Power - 25 power 回復',
																			_1: {
																				ctor: '::',
																				_0: 'Level 21 - Convert Retainer - 詠唱3秒 - 500 range - 0 Power - 50 power 回復',
																				_1: {
																					ctor: '::',
																					_0: 'Level 31 - Convert Servant - 詠唱3秒 - 500 range - 0 Power - 100 power 回復',
																					_1: {
																						ctor: '::',
																						_0: 'Level 41 - Convert Simulacrum - 詠唱3秒 - 500 range - 0 Power - 150 power 回復',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('単体 body resistance debuff は以下のように調整される。'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'Level 26 - Diminish Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - body resistances 15%',
																				_1: {
																					ctor: '::',
																					_0: 'Level 36 - Dissipate Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - body resistances 30%',
																					_1: {
																						ctor: '::',
																						_0: 'Level 46 - Banish Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - body resistances 50%',
																						_1: {ctor: '[]'}
																					}
																				}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('単体 spirit resistance debuff は以下のように調整される。'),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																					{
																						ctor: '::',
																						_0: 'Level 27 - Diminish Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - spirit resistances 15%',
																						_1: {
																							ctor: '::',
																							_0: 'Level 37 - Dissipate Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - spirit resistances 30%',
																							_1: {
																								ctor: '::',
																								_0: 'Level 47 - Banish Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - spirit resistances 50%',
																								_1: {ctor: '[]'}
																							}
																						}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('単体 energy resistance debuff は以下のように調整される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 29 - Diminish Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - energy resistances 15%',
																								_1: {
																									ctor: '::',
																									_0: 'Level 39 - Dissipate Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - energy resistances 30%',
																									_1: {
																										ctor: '::',
																										_0: 'Level 49 - Banish Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - energy resistances 50%',
																										_1: {ctor: '[]'}
																									}
																								}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('カバリスト 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('カバリストはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Body Destruction (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Level 45 lifetap, Abduct Lifeforce, のダメージは 174 から 199 に増加する。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Matter Magic (基本)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい matter DDスペルを追加'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power',
									_1: {
										ctor: '::',
										_0: 'Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power',
										_1: {
											ctor: '::',
											_0: 'Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power',
											_1: {
												ctor: '::',
												_0: 'Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power',
												_1: {
													ctor: '::',
													_0: 'Level 45 - Magma Crush - 2.6s - 184 matter damage - 1500 range - 30 power',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Matter Manipulation (スペック)'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('新しい matter damage PBAoE が追加される。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 8 - Minor Earth Tremble - 52 damage - 300 radius - 5 power',
												_1: {
													ctor: '::',
													_0: 'Level 18 - Earth Tremble - 111 damage - 300 radius - 9 power',
													_1: {
														ctor: '::',
														_0: 'Level 28 - Major Earth Tremble - 176 damage - 300 radius - 16 power',
														_1: {
															ctor: '::',
															_0: 'Level 38 - Upheaval - 260 damage - 300 radius - 23 power',
															_1: {
																ctor: '::',
																_0: 'Level 48 - Earthquake - 325 damage - 300 radius - 31 power',
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('新しい PBAoE のためにいくつかの呪文が修正される。'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Level 2 - Lesser Decrepify - 削除',
														_1: {
															ctor: '::',
															_0: 'Level 3 - Decrepify - level 2 へ移動',
															_1: {
																ctor: '::',
																_0: 'Level 4 - Reflect Blow - 削除',
																_1: {
																	ctor: '::',
																	_0: 'Level 6 - Reflect Damage - level 4 へ移動',
																	_1: {
																		ctor: '::',
																		_0: 'Level 10 - Lesser Contamination - 削除',
																		_1: {
																			ctor: '::',
																			_0: 'Level 13 - Contamination - level 10 へ移動',
																			_1: {
																				ctor: '::',
																				_0: 'Level 16 - Lesser Devolution - level 14 へ移動',
																				_1: {
																					ctor: '::',
																					_0: 'Level 18 - Punctured Spirit - level 17 へ移動',
																					_1: {
																						ctor: '::',
																						_0: 'Level 36 - Drill Spirit - level 34 へ移動',
																						_1: {
																							ctor: '::',
																							_0: 'Level 46 - Lance Spirit - level 45 へ移動',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('新しい AoE matter DDスペルを追加'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 8 - Earth Shatter - 3.0s - 28 matter damage - 1500 range - 350 半径 - 5 power',
																_1: {
																	ctor: '::',
																	_0: 'Level 17 - Earth Break - 3.0s - 72 matter damage - 1500 range - 350 半径 - 12 power',
																	_1: {
																		ctor: '::',
																		_0: 'Level 28 - Earth Crush - 3.0s - 95 matter damage - 1500 range - 350 半径 - 16 power',
																		_1: {
																			ctor: '::',
																			_0: 'Level 37 - Stone Break - 3.0s - 123 matter damage - 1500 range - 350 半径 - 21 power',
																			_1: {
																				ctor: '::',
																				_0: 'Level 47 - Stone Shatter - 3.0s - 158 matter damage - 1500 range - 350 半径 - 28 power',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Essence Manipulation (スペック)'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しい instant Energy resistance debuff を追加'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 22 - Energy Wither - 15% energy debuff - 1500 range - 10 power',
																			_1: {
																				ctor: '::',
																				_0: 'Level 34 - Energy Siphon - 30% energy debuff -1500 range - 16 power',
																				_1: {
																					ctor: '::',
																					_0: 'Level 46 - Energy Void - 50% energy debuff - 1500 range - 24 power',
																					_1: {ctor: '[]'}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('以下のスペルを移動'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 22 disease spell を level 20 に移動',
																					_1: {
																						ctor: '::',
																						_0: 'Level 34 disease spell を level 30 に移動',
																						_1: {
																							ctor: '::',
																							_0: 'Level 46 life transfer spell を level 41 に移動',
																							_1: {ctor: '[]'}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Spirit Animation (スペック)'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('ペット cure mesmerization cure を level 16 に追加'),
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Cabalist$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix2,
			A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix3, _Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix4))));

var _Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('チャンピオン 1.122B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('strength/constituion と dexterity/quickness の共同バフは一方が shear された状態でも両方とも有効とする。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('チャンピオン 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シージチャントは正しくグループメンバーに効果を及ぼすようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Champion$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('チャンピオン 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('チャンピオンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Valor (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Valor ラインは調整される。削除される能力はない。ハイエンドの能力はそのまま維持される。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('instant snare のレベルは 1, 11, 21, 31, 41 となる。威力は変わらない。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('endurance 軽減チャントのレベルは 12, 22, 32, 42 のままだがレベル2に追加される。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('instant DD シャウトのレベルは 3, 13, 23, 33, 43 となる。威力は変わらない。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Strength/Constitution バフは Dexterity/Quickness バフと統合されレベルは 4, 14, 24, 34, 44 となる。効果は変わらない。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('instant acuity debuff のレベルは 5, 15, 25, 35, 45 となる。威力は変わらない。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('instant Dexterity/Quickness debuff のレベルは 7, 17, 27, 37, 47 となる。威力は変わらない。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('instant haste debuff のレベルは 8, 18, 28, 38, 48 となる。威力は変わらない。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$br,
																				{ctor: '[]'},
																				{ctor: '[]'}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('instant Strength/Constitution debuff のレベルは 9, 19, 29, 39, 49 となる。威力は変わらない。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$br,
																						{ctor: '[]'},
																						{ctor: '[]'}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Call of the Champion はレベル50のままである。'),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$br,
																								{ctor: '[]'},
																								{ctor: '[]'}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('新しくグループシージダメージ低減オーラが追加される。'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'Level 6 - Champion\'s Ambience - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 10% 低下',
																											_1: {
																												ctor: '::',
																												_0: 'Level 16 - Champion\'s Demeanor - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 20% 低下',
																												_1: {
																													ctor: '::',
																													_0: 'Level 26 - Champion\'s Presence - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 30% 低下',
																													_1: {
																														ctor: '::',
																														_0: 'Level 36 - Champion\'s Aspect - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 40% 低下',
																														_1: {
																															ctor: '::',
																															_0: 'Level 46 - Champion\'s Aura - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ50% 低下 - 同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste',
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('新しく siege へのグループダメージボーナスが追加される。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																												{
																													ctor: '::',
																													_0: 'Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。',
																													_1: {ctor: '[]'}
																												}),
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Champion$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('チャンピオン 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Level 47 二次レジストバフ Against the Odds はそれよりも長時間有効なアイテムによるレジストバフを上書きしなくなる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Champion$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('チャンピオン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('チャンピオンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('RR5 Badge of Valor の再使用タイマーは15分から10分になる。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Valor (スペック)'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('DD shout の属性は body から energy になる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Dex/Qui debuff は自分を対象とした 20 秒間続く magic resistance buff を同時に唱える。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Str/Con debuff は同時に対象の現在および次回の bladeturn を除去する。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Haste debuff は自分のクリティカル率を20秒間3%増加させる。'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('Acuity debuff は自分の power を回復させる。'),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$br,
											{ctor: '[]'},
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('新しい魔法が追加される。この魔法は以下の2つの魔法を同時に唱える。'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Level 50 - Champion\'s Call - 味方のダメージ属性を energy に変える - 600 半径 - 30秒間継続 - melee/archery damage のみ対象 - 再使用10分',
														_1: {
															ctor: '::',
															_0: 'Level 50 - Call of the Champion - 30秒間継続 - 再使用10分 - 100%の確率で30% energy resistance debuff を行う offensive proc - 自分のみ対象',
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Large Weaponry (スペック)'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 15 – Domination – Side – ダメージ増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 34 - Demolish - Anytime - ダメージ減少',
																	_1: {
																		ctor: '::',
																		_0: 'Level 39 – Shatter – Hibernian Force – ダメージ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 50 - Annihilation - Rear - ダメージ増加',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Champion$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Champion$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Champion$patch_1_121B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Champion$patch_1_122B,
			A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix2, _Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix3))));

var _Ragamuffine$daoc_patch_notes$Cleric$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('クレリック 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 42 - Aura of Deflection - AF の値は 52 から 150 に増加する。'),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Cleric$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('クレリック 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('クレリックはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Rejuvenation (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff およびパラディンの resist buff とスタックしない。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 13 - Energy Shield - Spirit/Energy/Body resist 12%増加',
									_1: {
										ctor: '::',
										_0: 'Level 30 - Energy Guard - Spirit/Energy/Body resist 18%増加',
										_1: {
											ctor: '::',
											_0: 'Level 40 - Energy Barrier - Spirit/Energy/Body resist 24%増加',
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Hand of God は以下のように変更される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'ダメージ吸収を 85% から 50% に変更',
											_1: {
												ctor: '::',
												_0: 'focus ではなく target は戦闘が可能',
												_1: {
													ctor: '::',
													_0: '5s cast, 10秒間継続, 再使用60秒, 25% power cost',
													_1: {
														ctor: '::',
														_0: 'level 46 から 45 に変更',
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Smite (スペック)'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('Minor Deliverance (PBAoE snare) をレベル 7 から 6 に変更'),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$br,
													{ctor: '[]'},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('single-target mez を追加'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 9 - Heavenly Slumber - 28秒間継続 - 3s cast - 1500 range - 5 power',
																_1: {
																	ctor: '::',
																	_0: 'Level 14 - Graceful Slumber - 34秒間継続 - 3s cast - 1500 range - 8 power',
																	_1: {
																		ctor: '::',
																		_0: 'Level 23 - Hallowed Slumber - 40秒間継続 - 3s cast - 1500 range - 11 power',
																		_1: {
																			ctor: '::',
																			_0: 'Level 31 - Divine Slumber - 50秒間継続 - 3s cast - 1500 range - 15 power',
																			_1: {
																				ctor: '::',
																				_0: 'Level 41 - Holy Slumber - 60秒間継続 - 3s cast - 1500 range - 19 power',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('single-target Instant heal を追加'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 7 - Divine Light - 再使用60秒 - Heal 15% - 2000 range - 40% power',
																		_1: {
																			ctor: '::',
																			_0: 'Level 28 - Holy Light - 再使用60秒 - Heal 25% - 2000 range - 40% power',
																			_1: {
																				ctor: '::',
																				_0: 'Level 46 - Pure Light - 再使用60秒 - Heal 45% - 2000 range - 40% power',
																				_1: {ctor: '[]'}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('root 除去スペル Blessing of Movement を追加'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'level 13, 再使用5分, 3.0 sec cast, 1500 range, 10% power.',
																				_1: {
																					ctor: '::',
																					_0: '自分に対しては使用できない。',
																					_1: {ctor: '[]'}
																				}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Cleric$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Cleric$patch_1_121, _Ragamuffine$daoc_patch_notes$Cleric$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Druid$patch_1_122B_HotFix = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ドルイド 1.122B Hot Fix'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Cloak of the Loyal Druid の cure disease の頻度は30秒毎から15秒毎になる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Druid$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ドルイド 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 45 - Superior Skin of the Redwood - AF の値は 55 から 150 に増加する。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cloak of the Loyal Druid の pbaoe root /use ability は敵ターゲットに対して正しく発動するようになる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Cloak of the Loyal Druid の Aura of the Grove は正しく10分間継続するようになる。'),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Druid$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ドルイド 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ドルイドはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ペットが行う自己バフはプレイヤーが上書きできない。ペットの自己バフは25% buff effectiveness ボーナスで効果を計算される。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Regrowth (基本)'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff およびバードの resist buff とスタックしない。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 13 - Warmth of the Badger - Increases Heat/Matter/Cold resist 12%増加',
										_1: {
											ctor: '::',
											_0: 'Level 30 - Warmth of the Wolf - Increases Heat/Matter/Cold resist 18%増加',
											_1: {
												ctor: '::',
												_0: 'Level 40 - Warmth of the Bear - Increases Heat/Matter/Cold resist 24%増加',
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('Nature\'s Cocoon (single-target focus damage shell) は次のように変更される。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'ダメージ吸収を 90% から 50% に変更',
												_1: {
													ctor: '::',
													_0: 'focus ではなく target は戦闘が可能',
													_1: {
														ctor: '::',
														_0: '5s cast, 10秒間継続, 再使用60秒, 25% power cost',
														_1: {
															ctor: '::',
															_0: 'level 47 から 45 に変更',
															_1: {ctor: '[]'}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nature (基本)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('従来の召喚ペットはベースに移動される。最大レベルは 40 である。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nature (スペック)'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('AoE damage shield buff は削除される。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('single target グラップルが追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 14 - Forest\'s Pull - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 5秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン',
																			_1: {
																				ctor: '::',
																				_0: 'Level 35 - Forest\'s Reach - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 8秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン',
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい召喚ペットが追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 42, Call Nature Sage. ペットレベル50. melee haste buff と str/con buff を自分にかける。',
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('新しい呪文が追加される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 2 - Nature\'s Frenzy - Instant cast - ペット対象 50% celerity buff, 25% damage done buff, -25% absorption debuff. 持続時間30秒, 再使用60秒',
																							_1: {
																								ctor: '::',
																								_0: 'ペットコマンド“Frenzy”は削除される。',
																								_1: {ctor: '[]'}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('AoE Instant heal が追加される。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Level 15 - 再使用60秒 - Heal 15%, 1500 range, 250 半径.',
																									_1: {
																										ctor: '::',
																										_0: 'Level 45 - 再使用60秒 - Heal 45%, 1500 range, 250 半径.',
																										_1: {ctor: '[]'}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('root 除去スペル Free Wind を追加'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'level 13, 再使用5分, 3.0 sec cast, 1500 range, 10% power.',
																											_1: {
																												ctor: '::',
																												_0: '自分に対しては使用できない。',
																												_1: {ctor: '[]'}
																											}
																										}),
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Druid$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Druid$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Druid$patch_1_122B, _Ragamuffine$daoc_patch_notes$Druid$patch_1_122B_HotFix));

var _Ragamuffine$daoc_patch_notes$Eldritch$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エルドリッチ 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('エルドリッチはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('エルドリッチはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レルムアビリティーに Ichor of the Deep が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Mana Magic (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Level 2 PBAoE は削除される。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Level 8 strength/constitution debuff は Level 12 になる。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Level 32 PBAoE Mana Billow は Level 31 になる。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい single target root が追加される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 2 - Soul Grasp - 2.5s cast - 1500 range - 15秒間継続 - 3 power',
													_1: {
														ctor: '::',
														_0: 'Level 12 - Soul Clutch - 2.5s cast - 1500 range - 23秒間継続 - 7 power',
														_1: {
															ctor: '::',
															_0: 'Level 22 - Soul Hold - 2.5s cast - 1500 range - 44秒間継続 - 17 power',
															_1: {
																ctor: '::',
																_0: 'Level 32 - Soul Embrace - 2.5s cast - 1500 range - 57秒間継続 - 23 power',
																_1: {
																	ctor: '::',
																	_0: 'Level 42 - Soul Restraint - 2.5s cast - 1500 range - 69秒間継続 - 29 power',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Light Magic (スペック)'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('Level 40 nearsight Abrogate Sight は Level 41 になる。'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Level 22 cold DD Shadowcrash は Level 21 になる。'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('Level 46 dexterity/quickness debuff Extinguish Coordination は Level 44 になる。'),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$br,
																	{ctor: '[]'},
																	{ctor: '[]'}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('新しく spirit resistance debuff が追加される。'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'Level 22 - Crumble Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - spirit resistance debuff 15%',
																				_1: {
																					ctor: '::',
																					_0: 'Level 34 - Fade Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - spirit resistance debuff 30%',
																					_1: {
																						ctor: '::',
																						_0: 'Level 46 - Vanquish Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - spirit resistance debuff 50%',
																						_1: {ctor: '[]'}
																					}
																				}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Eldritch$all = _Ragamuffine$daoc_patch_notes$Eldritch$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix4 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.122B Hot Fix #4'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Underhill Stalker ペットの移動速度がやや低下する。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.122B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Enchantment of Mana バフは以下のように修正される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'proc 率が 100% から 33% に低下する。',
					_1: {
						ctor: '::',
						_0: 'pbaoe ダメージは Enchanter のレベルに比例する。レベル50時点でのダメージは275のまま変わらない。',
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Enchantment of Zeal の再使用タイマーは5分から10分に増加する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Heal Effectiveness バフの有効時間は45秒から30秒に短縮される。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Underhill Stalker ペットの物理防御は減少する。'),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Enchantment of Mana のだめーじは 325 から 275 に減少する。再使用タイマーは60秒になる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Mana Barrier のバフを右クリックで除去して無効時間の発生を防ぐことはもはやできなくなる。'),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.122B Hot Fix'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('“Enchantment of …”の呪文はグループメンバーに対して正しく上書きするようになる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Underhill Ally の health regeneration は削除される。この能力はバードのヒールソングと衝突している。物理レジストバフだけでも充分に強力である。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('レベル 48 の PBAoE スペルのダメージが正しい値になる。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('The Loyal Enchanter class cloak の半径増加のアビリティーはグループメンバーに対して正しく機能する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('The Enchantment of Mana の効果はすべてのクラスに対して正しく機能するはずである。'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('エンチャンターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Enchantments (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('グループスピード呪文の効果はバードと同じレベルまで強化される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 5 - Lesser Effervescence - 126% から 144% に',
							_1: {
								ctor: '::',
								_0: 'Level 15 - Effervescence - 133% から 156% に',
								_1: {
									ctor: '::',
									_0: 'Level 25 - Greater Effervescence - 141% から 174% に',
									_1: {
										ctor: '::',
										_0: 'Level 35 - Superior Effervescence - 148% から 189% に',
										_1: {
											ctor: '::',
											_0: 'Level 45 - Maximum Effervescence - 176% から 204% に',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('単体 root は調整される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 9 - Dazzling Clutch - 詠唱時間2.5秒 - 1500 range - 持続時間23秒 - 7 power',
									_1: {
										ctor: '::',
										_0: 'Level 19 - Dazzling Grip - 詠唱時間2.5秒 - 1500 range - 持続時間33秒 - 12 power',
										_1: {
											ctor: '::',
											_0: 'Level 29 - Dazzling Hold - 詠唱時間2.5秒 - 1500 range - 持続時間44秒 - 17 power',
											_1: {
												ctor: '::',
												_0: 'Level 39 - Dazzling Embrace - 詠唱時間2.5秒 - 1500 range - 持続時間57秒 - 23 power',
												_1: {
													ctor: '::',
													_0: 'Level 49 - Dazzling Restraint - 詠唱時間2.5秒 - 1500 range - 持続時間69秒 - 29 power',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('単体ペットヒールは調整される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 3 - Support Ally - 詠唱3秒 - 2000 range - 46回復',
											_1: {
												ctor: '::',
												_0: 'Level 13 - Invest Ally - 詠唱3秒 - 2000 range - 81回復',
												_1: {
													ctor: '::',
													_0: 'Level 23 - Infuse Ally - 詠唱3秒 - 2000 range - 146回復',
													_1: {
														ctor: '::',
														_0: 'Level 33 - Imbue Ally - 詠唱3秒 - 2000 range - 201回復',
														_1: {
															ctor: '::',
															_0: 'Level 43 - Succor Ally - 詠唱3秒 - 2000 range - 300回復',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('ペットは召喚者のレベルと等しくなる。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('新しいペットが追加される。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 1 - Underhill Companion - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。heat DD でターゲットを攻撃する。ターゲットの heat レジストデバフを行う。ターゲットの詠唱ミスを引き起こす。',
															_1: {
																ctor: '::',
																_0: 'Level 11 - Underhill Compatriot - 詠唱6秒 - 40% power - このペットはタンクである。背後から Annihilation を行う。側面から Domination を行う。parry 後は Ultimate Recovery を行う。ターゲットを Celtic Fury でタウントする。魔法および物理攻撃へのレジストはとても高い。',
																_1: {
																	ctor: '::',
																	_0: 'Level 21 - Underhill Ally - 詠唱6秒 - 40% power - このペットは魔法支援に特化している。このペットはダメージを受けた味方をヒールする。passive 状態の時はヒールし続け敵に妨害されることはない。味方に health regeneration バフと 5% の物理レジストバフをかける。',
																	_1: {
																		ctor: '::',
																		_0: 'Level 31 - Underhill Stalker - 詠唱6秒 - 40% power - このペットは物理攻撃に特化している。このペットは極めて高い物理攻撃力があるが防御は弱い。critical strike スタイルを多用する。武器は Lifebane に覆われている。被ダメージをわずかに緩和する。',
																		_1: {
																			ctor: '::',
																			_0: 'Level 41 - Underhill Zealot - 詠唱6秒 - 40% power - このペットは魔法で攻撃を行う。すべての tick が妨害をする DoT を詠唱する。ターゲットの dexterity をデバフする。',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Enchanting (Enchantments スペック)'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しい body DD スペルが追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 4 - Dazzling Glimmer - 詠唱2.6秒 - 1500 range - 34 body damage',
																		_1: {
																			ctor: '::',
																			_0: 'Level 14 - Dazzling Flicker - 詠唱2.6秒 - 1500 range - 68 body damage',
																			_1: {
																				ctor: '::',
																				_0: 'Level 24 - Dazzling Shimmer - 詠唱2.6秒 - 1500 range - 122 body damage',
																				_1: {
																					ctor: '::',
																					_0: 'Level 34 - Dazzling Flash - 詠唱2.6秒 - 1500 range - 153 body damage',
																					_1: {
																						ctor: '::',
																						_0: 'Level 44 - Dazzling Beam - 詠唱2.6秒 - 1500 range - 199 body damage',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('新しくヒールボーナススペルが追加される。'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'Level 9 - Calming Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス10%増加',
																				_1: {
																					ctor: '::',
																					_0: 'Level 19 - Peaceful Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス20%増加',
																					_1: {
																						ctor: '::',
																						_0: 'Level 29 - Harmonic Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス40%増加',
																						_1: {
																							ctor: '::',
																							_0: 'Level 39 - Serene Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス65%増加',
																							_1: {
																								ctor: '::',
																								_0: 'Level 49 - Graceful Light - 詠唱2秒 - 1500 range - 持続時間45秒 - 再使用30秒 - 15% power - ターゲットのヒールボーナス100%増加',
																								_1: {ctor: '[]'}
																							}
																						}
																					}
																				}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('新しく魔法吸収バフを追加する。このバフは消滅後60秒間は同じタイプのバフを同一ターゲットにかけることはできない。'),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																					{
																						ctor: '::',
																						_0: 'Level 1 - Enchanted Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 30',
																						_1: {
																							ctor: '::',
																							_0: 'Level 11 - Magic Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 150',
																							_1: {
																								ctor: '::',
																								_0: 'Level 21 - Empowered Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 350',
																								_1: {
																									ctor: '::',
																									_0: 'Level 31 - Arcane Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 750',
																									_1: {
																										ctor: '::',
																										_0: 'Level 41 - Mana Barrier - 詠唱3秒 - 2000 range - 持続時間15秒 - 20% power - 魔法ダメージ吸収 1500',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しくグループ強化スペルが追加される。同時に一つのスペルのみ有効である。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 6 - Enchantment of Ice - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が cold になり物理攻撃はターゲットを 50% slow にする。',
																								_1: {
																									ctor: '::',
																									_0: 'Level 16 - Enchantment of Stone - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が matter になり armor factor が 300 増加する。',
																									_1: {
																										ctor: '::',
																										_0: 'Level 26 - Enchantment of Fire - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃属性が heat になり物理ダメージが 25% 増加する。',
																										_1: {
																											ctor: '::',
																											_0: 'Level 36 - Enchantment of Mana - 詠唱2.4秒 - 4000 range - 持続時間30秒 - 30% power - 物理攻撃がターゲット周辺に 325 energy ダメージを与える。ただしターゲットには影響はない。',
																											_1: {
																												ctor: '::',
																												_0: 'Level 46 - Enchantment of Truth - 詠唱2.4秒 - 4000 range - 持続時間15秒 - 30% power - 物理攻撃が 100% ヒットする。ブレードターンを貫通する。',
																												_1: {
																													ctor: '::',
																													_0: 'Level 50 - Enchantment of Zeal - 10s cast - 4000 range - 持続時間30秒 - 再使用5分 - 30% power - コンバットスタイルのダメージボーナスを3倍にする。スタイルダメージを与えた分、自グループをヒールする。',
																													_1: {ctor: '[]'}
																												}
																											}
																										}
																									}
																								}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('エンチャンター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('エンチャンターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Mana Magic (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい single target instant haste debuff が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 5 - Distracting Scintillation - Instant cast - 1500 range - 45秒間継続 - 5 power - 攻撃速度低下 14%.',
							_1: {
								ctor: '::',
								_0: 'Level 17 - Blinding Scintillation - Instant cast - 1500 range - 45秒間継続 - 12 power - 攻撃速度低下 22%.',
								_1: {
									ctor: '::',
									_0: 'Level 25 - Disturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 17 power - 攻撃速度低下 24%.',
									_1: {
										ctor: '::',
										_0: 'Level 37 - Perturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 23 power - 攻撃速度低下 31%.',
										_1: {
											ctor: '::',
											_0: 'Level 48 - Agitating Scintillation - Instant cast - 1500 range - 45秒間継続 - 31 power - 攻撃速度低下 38%.',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Light Magic (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('single target instant haste debuff は Mana Magic に移される。instant AoE haste debuff は残る。'),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Enchanter$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix2,
				A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix3, _Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix4)))));

var _Ragamuffine$daoc_patch_notes$Friar$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('フライアー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 42 - Aura of Deflection - AF の値は 52 から 150 に増加する。'),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Friar$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('フライアー 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Level 50 Staff スタイル Excommunication の group heal proc の効果は 125 から 150 に増加し、範囲は 500 から 1500 になる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Friar$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('フライアー 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('フライアーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Enhancements (スペック)は全般的に修正される。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('group endurance 低減スペルは pulse になる。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 2 - Saint\'s Resolve - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減5%.',
									_1: {
										ctor: '::',
										_0: 'Level 12 - Saint\'s Energy - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減10%.',
										_1: {
											ctor: '::',
											_0: 'Level 22 - Saint\'s Stamina - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減15%.',
											_1: {
												ctor: '::',
												_0: 'Level 32 - Saint\'s Persistence - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減20%.',
												_1: {
													ctor: '::',
													_0: 'Level 42 - Saint\'s Tenacity - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減25%.',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('instant タウントスペルはスペックに移動される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 23 - Inflame',
											_1: {
												ctor: '::',
												_0: '他のレベルは削除される。',
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('グループレジスト pulse のレベルが変更される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 13 - Golestandt\'s Fire',
													_1: {
														ctor: '::',
														_0: 'Level 31 - Golestandt\'s Breath',
														_1: {
															ctor: '::',
															_0: 'Level 43 - Golestandt\'s Heart',
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('自己ヘイストバフはグループバフになる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 4 - Speed of the Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト10%.',
															_1: {
																ctor: '::',
																_0: 'Level 14 - Alacrity of the Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト13%.',
																_1: {
																	ctor: '::',
																	_0: 'Level 24 - Haste of the Archangel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト20%.',
																	_1: {
																		ctor: '::',
																		_0: 'Level 34 - Alacrity of the Archangel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト25%.',
																		_1: {
																			ctor: '::',
																			_0: 'Level 44 - Alacrity of the Heavenly Host Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト30%.',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('自己 Dex/Qui バフのレベルが変更される。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 5 - Readiness',
																	_1: {
																		ctor: '::',
																		_0: 'Level 15 - Agility',
																		_1: {
																			ctor: '::',
																			_0: 'Level 25 - Precision',
																			_1: {
																				ctor: '::',
																				_0: 'Level 35 - Gracefulness',
																				_1: {
																					ctor: '::',
																					_0: 'Level 45 - Fluidity',
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('concentration 型のヘイストバフのレベルが変更される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 6 - Imbue Lesser Haste',
																			_1: {
																				ctor: '::',
																				_0: 'Level 16 - Imbue Greater Haste',
																				_1: {
																					ctor: '::',
																					_0: 'Level 26 - Imbue Lesser Alacrity',
																					_1: {
																						ctor: '::',
																						_0: 'Level 36 - Imbue Alacrity',
																						_1: {
																							ctor: '::',
																							_0: 'Level 46 - Imbue Greater Alacrity',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい parry 増加自己バフが追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 7 - Novice Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加2%, abs 増加3%.',
																					_1: {
																						ctor: '::',
																						_0: 'Level 17 - Apprentice Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加4%, abs 増加6%.',
																						_1: {
																							ctor: '::',
																							_0: 'Level 27 - Expert Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加6%, abs 増加9%.',
																							_1: {
																								ctor: '::',
																								_0: 'Level 37 - Master Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加8%, abs 増加12%.',
																								_1: {
																									ctor: '::',
																									_0: 'Level 47 - Grandmaster Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加10%, abs 増加15%.',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('group defensive heal proc のレベルが修正される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 9 - Protection from Fear',
																							_1: {
																								ctor: '::',
																								_0: 'Level 19 - Protection from Doubt',
																								_1: {
																									ctor: '::',
																									_0: 'Level 29 - Protection from Anarchy',
																									_1: {
																										ctor: '::',
																										_0: 'Level 39 - Protection from Idleness',
																										_1: {
																											ctor: '::',
																											_0: 'Level 49 - Protection from Heresy',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('新しい group evasion 増加バフが追加される。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Level 20 - Sharpness - Instant - 持続時間20秒 - 再使用60秒 - 200 range - 15% power - evasion の確率15%アップ.',
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('新しい自己保護スペルが追加される。'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'Level 30 - Meditation - Instant - 持続時間5秒 - 再使用3分 - 0 power - すべての受けたダメージを50%削減し health, power, endurance を1秒ごとに5%回復する。移動、攻撃、呪文詠唱すると効果を失う。この能力は持続時間延長ボーナスの影響を受けない。',
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('新しいグループ保護バフが追加される。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																												{
																													ctor: '::',
																													_0: 'Level 50 - Tranquility - Instant - 持続時間10秒 - 再使用10分 - 1500 range - 25% power - グループが受けるすべてのダメージを15%削減し health, power, endurance を1秒ごとに5%回復する。ただし自分には効果がない。',
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('自己 endurance 回復 pulse は Level 3 に移動される。'),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('自己 ABS バフは削除される。'),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('自己 Spec AF バフは削除される。'),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('offensive heal proc 自己バフは削除される。'),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Staff (スペック)'),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('Staff (スペック)は全般的に修正される。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																			{
																																				ctor: '::',
																																				_0: 'Level 1 - Spinning Staff - Anytime - Low Endurance - Low Damage - No Offensive Bonus - No Defensive Bonus - 4秒毎に出血 3 ダメージ、継続20秒',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 4 - Jabbing Staff - Spinning Staff - Medium Endurance - Medium Damage - Low Offensive Bonus - Low Defensive Bonus - 10 HP回復.',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 8 - Defender\'s Fury - Parry - Medium Endurance - High Damage - Low Offensive Bonus - Medium Defensive Bonus - 攻撃速度デバフ20%、継続20秒',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 10 - Quick Strike - Taunt - 無変更',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Level 12 - Friar\'s Redress - Detaunt - 無変更',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Level 15 - Double Strike - Side - Low Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - 5秒スタン',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Level 18 - Friar\'s Friend - Back - High Endurance - Medium Damage - Medium Offensive Bonus - No Defensive Bonus - 40%スネア27秒',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Level 25 - Counter Evade - Evade - Medium Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - ヘイスト20%15秒',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Level 29 - Banish - Double Strike - Very High Endurance - High Damage - Medium Offensive Bonus - No Defensive Bonus - 175 spirit damage, 半径350',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Level 34 - Holy Staff - Anytime - High Endurance - Medium Damage - Low Offensive Bonus - Low Defensive Bonus - 2秒ごとに50 health グループ回復、継続10秒',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 39 - Friar\'s Fury - Defender\'s Fury Followup - Very High Endurance - High Damage - Medium Offensive Bonus - Medium Defensive Bonus - 8秒スタン',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 44 - Figure Eight - Counter Evade Followup - High Endurance - Very High Damage - High Offensive Bonus - Low Defensive Bonus - weaponskill 増加 10%',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 50 - Excommunicate - Holy Staff Followup - High Endurance - Low Damage - Low Offensive Bonus - 30 spirit damage、同時にグループ回復 125 health',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}),
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Friar$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('フライアー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('フライアーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Rejuvenation (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Rejuvenation (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい cure mesmerization 能力を追加'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 26 - Awaken Soul - 3s cast time - 1500 range - 6% power cost',
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しい pulsing poison cure を追加'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 14 - Pulsing Cure Poison I - 3.5s cast - 2000 range - 20 power',
											_1: {
												ctor: '::',
												_0: 'Level 28 - Pulsing Cure Poison II - 3.7s cast - 2000 range - 25 power',
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい pulsing disease cure を追加'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 18 - Pulsing Cure Disease I - 3.5s cast - 2000 range - 20 power',
													_1: {
														ctor: '::',
														_0: 'Level 36 - Pulsing Cure Disease II - 3.7s cast - 2000 range - 28 power',
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (スペック)'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff およびパラディンの resist buff とスタックしない。'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 13 - Golestandt\'s Fire - Heat/Matter/Cold resist 12%増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 31 - Golestandt\'s Breath - Heat/Matter/Cold resist 18%増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 46 - Golestandt\'s Heart - Heat/Matter/Cold resist 24%増加',
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Staff (スペック)'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('フライアーの基本 Staff ダメージテーブルは他のハイブリッドクラスと同じになる。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Staff のスタイルは以下のように修正される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 4 - Figure Eight - 正面 - 14 damage bleed',
																					_1: {
																						ctor: '::',
																						_0: 'Level 15 - Double Strike - Figure Eight - 5秒スタン',
																						_1: {
																							ctor: '::',
																							_0: 'Level 21 - Counter Evade - Off evade style - 21%攻撃速度デバフ、ダメージやや増加',
																							_1: {
																								ctor: '::',
																								_0: 'Level 25 - Banish - Friar\'s Friend - PBAOE 175 DD (spirit)',
																								_1: {
																									ctor: '::',
																									_0: 'Level 34 - Holy Staff - Anytime - ダメージやや低下',
																									_1: {
																										ctor: '::',
																										_0: 'Level 39 - Friar\'s Fury - Counter Evade - 14秒 hinder',
																										_1: {
																											ctor: '::',
																											_0: 'Level 42 - Dancing Staff - Holy Staff - 距離1000以内のグループメンバーの移動速度を15%4秒間増加させる。このボーナスは戦闘中であってもスピードワープの中でも有効。',
																											_1: {
																												ctor: '::',
																												_0: 'Level 50 - Exommunicate - Anytime - 150 direct damage (spirit)',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Friar$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Friar$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Friar$patch_1_121B,
		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Friar$patch_1_121C, _Ragamuffine$daoc_patch_notes$Friar$patch_1_122B)));

var _Ragamuffine$daoc_patch_notes$Healer$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヒーラー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Augmentation (基本)'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 42 - Guardian\'s Lesser Protection - AFの上昇値を 52 から 150 に増加',
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Pacification (基本)'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('グループスピード呪文の効果はスカルドと同じレベルまで強化される。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 6 - Ease of Movement - 126% から 144% に',
								_1: {
									ctor: '::',
									_0: 'Level 15 - Flow of Movement - 133% から 156% に',
									_1: {
										ctor: '::',
										_0: 'Level 25 - Grace of Movement - 141% から 174% に',
										_1: {
											ctor: '::',
											_0: 'Level 35 - Purity of Movement - 148% から 189% に',
											_1: {
												ctor: '::',
												_0: 'Level 45 - Elegance of Movement - 176% から 204% に',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Healer$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヒーラー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ヒーラーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヒーラーはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Mending (基本)'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Augmentation (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('mesmerize reduction self-buff は除去される。'),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$br,
									{ctor: '[]'},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff とスタックしない。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 13 - Gods\' Health - Spirit/Energy/Body resist 12%増加',
												_1: {
													ctor: '::',
													_0: 'Level 30 - Gods\' Vigor - Spirit/Energy/Body resist 18%増加',
													_1: {
														ctor: '::',
														_0: 'Level 40 - Gods\' Potency - Spirit/Energy/Body resist 24%増加',
														_1: {ctor: '[]'}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Pacification (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('single target instant heal が追加される。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 33 - Healing Surge - 50 sec 再使用 - Heal 20% - 1000 range - 40% power',
															_1: {
																ctor: '::',
																_0: 'Level 43 - Restorative Surge - 50 sec 再使用 - Heal 45% - 1000 range - 40% power',
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Healer$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Healer$patch_1_121, _Ragamuffine$daoc_patch_notes$Healer$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Heretic$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヘレティック 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancements (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 42 - Aura of Deflection - AF の値は 52 から 150 に増加する。'),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Heretic$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヘレティック 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ヘレティックはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヘレティックはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レルムアビリティーに Ichor of the Deep が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Rejuvenation (基本)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Rejuvenation (スペック)'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Reanimate Corpse (monster rez) は次のように変更される。100% hitpoints/power/endurance ではなくて 50% になる。resurrection sickness が除去されるのはそのままである。heal/buff することが可能になる。ターゲットは戦闘および呪文詠唱が可能になる。20 秒間継続の 75% damage reduction を得る。AoE DoT を失う。disease 状態になる。cure disease は可能だが damage reduction を失う。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい single target matter DD が追加される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 2 - Dark Ashes - 2.6s cast - 1500 range - 4 power - 13 matter damage',
													_1: {
														ctor: '::',
														_0: 'Level 17 - Dark Obsidian - 2.6s cast - 1500 range - 9 power - 67 matter damage',
														_1: {
															ctor: '::',
															_0: 'Level 24 - Dark Slag - 2.6s cast - 1500 range - 14 power - 89 matter damage',
															_1: {
																ctor: '::',
																_0: 'Level 35 - Dark Basalt - 2.6s cast - 1500 range - 28 power - 146 matter damage',
																_1: {
																	ctor: '::',
																	_0: 'Level 45 - Dark Magma - 2.6s cast - 1500 range - 44 power - 184 matter damage',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('AoE focus snare DD のレンジが 1750 になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Enhancement (スペック)'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('新しい constitution debuff が追加される。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 4 - Dark Horror - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 constitution',
																	_1: {
																		ctor: '::',
																		_0: 'Level 20 - Mind Horror - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 constitution',
																		_1: {
																			ctor: '::',
																			_0: 'Level 31 - Evil Horror - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 constitution',
																			_1: {
																				ctor: '::',
																				_0: 'Level 42 - Demon Horror - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 constitution',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しい strength debuff が追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 3 - Soften Joints - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 strength',
																			_1: {
																				ctor: '::',
																				_0: 'Level 13 - Soften Limbs - 3.0s cast - 1500 range - 45秒間継続 - 9 power - 16 strength',
																				_1: {
																					ctor: '::',
																					_0: 'Level 22 - Soften Bones - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 strength',
																					_1: {
																						ctor: '::',
																						_0: 'Level 34 - Soften Muscle - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 strength',
																						_1: {
																							ctor: '::',
																							_0: 'Level 44 - Soften Strength - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 strength',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい dexterity debuff が追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 6 - Heat Wave - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 dexterity',
																					_1: {
																						ctor: '::',
																						_0: 'Level 16 - Heat Rush - 3.0s cast - 1500 range - 45秒間継続 - 9 power - 16 dexterity',
																						_1: {
																							ctor: '::',
																							_0: 'Level 25 - Heal Swell - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 dexterity',
																							_1: {
																								ctor: '::',
																								_0: 'Level 35 - Heat Coil - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 dexterity',
																								_1: {
																									ctor: '::',
																									_0: 'Level 45 - Heat Flux - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 dexterity',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('新しい single target strength/constitution shear が追加される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 36 - Endowment Seize - 3.0s cast - 1750 range - 12 power',
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('single target damage shield スペルは除去される。'),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('group target damage shield スペルは除去される。'),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('group target reactive buff shear proc は除去される。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('レベル 36 self damage add, Infernal Tear, はレベル 37 になる。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('自己 melee-absorb buff はベースからスペックになる。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Crush (スペック)'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'Level 39 - Bone Crusher - Concussion-up - ダメージ増加',
																														_1: {ctor: '[]'}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Heretic$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Heretic$patch_1_121, _Ragamuffine$daoc_patch_notes$Heretic$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Hero$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヒーロー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Celtic Spear (スペック)'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 15 - Hunter\'s Lance - Hunter\'s Boon - ダメージ増加',
					_1: {
						ctor: '::',
						_0: 'Level 34 - Eagle Talon - Anytime - ダメージ減少',
						_1: {
							ctor: '::',
							_0: 'Level 44 - Dragon Talon - Side - ダメージやや増加',
							_1: {
								ctor: '::',
								_0: 'Level 50 - Cuchulain\'s Revenge - Dragon Talon - ダメージ増加',
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Large Weaponry (スペック)'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 15 - Domination - Side - ダメージ増加',
							_1: {
								ctor: '::',
								_0: 'Level 34 - Demolish - Anytime - ダメージ減少',
								_1: {
									ctor: '::',
									_0: 'Level 39 - Shatter - Hibernian Force - ダメージ増加',
									_1: {
										ctor: '::',
										_0: 'Level 50 - Annihilation - Rear - ダメージ増加',
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Hero$all = _Ragamuffine$daoc_patch_notes$Hero$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Hunter$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ハンター 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Beastcraft (スペック)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 50 - Hunter\'s Elder Avatar - ペットのレベルは召喚者のレベルと同じになる。'),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Hunter$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ハンター 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Point Blank Shot の Pulsing Bladeturn 効果は除去される。自己ヘイストは元の値に戻される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 16 - 22% haste',
					_1: {
						ctor: '::',
						_0: 'Level 28 - 30% haste',
						_1: {
							ctor: '::',
							_0: 'Level 40 - 39% haste',
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('ハンターのペットは side stun を行わなくなる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Hunter$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ハンター 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Point Blank Shot の combat speed buff が変更される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 30 - Point Blank Shot 2 - Combat Speed 30% から 25% に変更',
					_1: {
						ctor: '::',
						_0: 'Level 40 - Point Blank Shot 3 - Combat Speed 39% から 29% に変更',
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Hunter$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ハンター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ハンターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ハンターはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('すべてのアーチャーは Level 50 で Remedy を得る。Remedy は再使用 5 分でもはや HP を失わない。毒に対する耐性を 60 秒間維持する。'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$br,
							{ctor: '[]'},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('すべてのアーチャーは Mastery of Stealth を獲得する。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 10 - Mastery of Stealth 1',
										_1: {
											ctor: '::',
											_0: 'Level 15 - Mastery of Stealth 2',
											_1: {
												ctor: '::',
												_0: 'Level 20 - Mastery of Stealth 3',
												_1: {
													ctor: '::',
													_0: 'Level 25 - Mastery of Stealth 4',
													_1: {
														ctor: '::',
														_0: 'Level 30 - Mastery of Stealth 5',
														_1: {
															ctor: '::',
															_0: 'Level 35 - Mastery of Stealth 6',
															_1: {
																ctor: '::',
																_0: 'Level 40 - Mastery of Stealth 7',
																_1: {
																	ctor: '::',
																	_0: 'Level 45 - Mastery of Stealth 8',
																	_1: {
																		ctor: '::',
																		_0: 'Level 50 - Mastery of Stealth 9',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('Mastery of Stealth の移動速度への効果は減少する。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Mastery of Stealth 1 の移動速度は +10% のままである',
												_1: {
													ctor: '::',
													_0: 'Mastery of Stealth 2 の移動速度は +15% から +13% に減少する',
													_1: {
														ctor: '::',
														_0: 'Mastery of Stealth 3 の移動速度は +20% から +16% に減少する',
														_1: {
															ctor: '::',
															_0: 'Mastery of Stealth 4 の移動速度は +25% から +19% に減少する',
															_1: {
																ctor: '::',
																_0: 'Mastery of Stealth 5 の移動速度は +30% から +22% に減少する',
																_1: {
																	ctor: '::',
																	_0: 'Mastery of Stealth 6 の移動速度は +35% から +25% に減少する',
																	_1: {
																		ctor: '::',
																		_0: 'Mastery of Stealth 7 の移動速度は +40% から +28% に減少する',
																		_1: {
																			ctor: '::',
																			_0: 'Mastery of Stealth 8 の移動速度は +45% から +31% に減少する',
																			_1: {
																				ctor: '::',
																				_0: 'Mastery of Stealth 9 の移動速度は +50% から +34% に減少する',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('50 stealth MOS9 を持つアーチャーはステルス中に通常速度の80%で移動する。'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Archery (スペック)'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('damage add スペルは削除される。'),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$br,
															{ctor: '[]'},
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('Critical Shot のダメージは増加する。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Critical Shot 1 のダメージは 12 から 15 へ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Critical Shot 2 のダメージは 38 から 50 へ増加',
																			_1: {
																				ctor: '::',
																				_0: 'Critical Shot 3 のダメージは 79 から 90 へ増加',
																				_1: {
																					ctor: '::',
																					_0: 'Critical Shot 4 のダメージは 106 から 129 へ増加',
																					_1: {
																						ctor: '::',
																						_0: 'Critical Shot 5 のダメージは 132 から 168 へ増加',
																						_1: {
																							ctor: '::',
																							_0: 'Critical Shot 6 のダメージは 185 から 209 へ増加',
																							_1: {
																								ctor: '::',
																								_0: 'Critical Shot 7 のダメージは 212 から 248 へ増加',
																								_1: {
																									ctor: '::',
																									_0: 'Critical Shot 8 のダメージは 239 から 288 へ増加',
																									_1: {
																										ctor: '::',
																										_0: 'Critical Shot 9 のダメージは 265 から 308 へ増加',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('アーチャーの Critical Shot ペナルティーが -50% から -75% に増加する。'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Standard Shot は 5 秒から 4.0 秒になる。'),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('Elemental Shot は 7 秒から 5.0 秒になる。ダメージタイプが以下のようになる。'),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																					{
																						ctor: '::',
																						_0: 'Hunter: Benthic (cold), Tempestuous (spirit)',
																						_1: {
																							ctor: '::',
																							_0: 'Ranger: Pyroclasmic (heat), Entropic (energy)',
																							_1: {
																								ctor: '::',
																								_0: 'Scout: Lithic (matter), Somatic (body)',
																								_1: {ctor: '[]'}
																							}
																						}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('Power shot は 6 秒から 3.5 秒になり、dex により修正される。'),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$br,
																							{ctor: '[]'},
																							{ctor: '[]'}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('Power shot のダメージは増加する。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Power Shot 1 のダメージは 12 から 15 へ増加',
																										_1: {
																											ctor: '::',
																											_0: 'Power Shot 2 のダメージは 38 から 50 へ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Power Shot 3 のダメージは 79 から 90 へ増加',
																												_1: {
																													ctor: '::',
																													_0: 'Power Shot 4 のダメージは 106 から 129 へ増加',
																													_1: {
																														ctor: '::',
																														_0: 'Power Shot 5 のダメージは 132 から 168 へ増加',
																														_1: {
																															ctor: '::',
																															_0: 'Power Shot 6 のダメージは 185 から 209 へ増加',
																															_1: {
																																ctor: '::',
																																_0: 'Power Shot 7 のダメージは 212 から 248 へ増加',
																																_1: {
																																	ctor: '::',
																																	_0: 'Power Shot 8 のダメージは 239 から 288 へ増加',
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Power Shot は bladeturn を貫通する。ブロックされない。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Power shot は再使用20秒となる。'),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('Power shot はアーチャーのダメージペナルティーの対象となる。'),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('Rapid Fire shot は前方 90 度の cone AoE (FAE) となる。半径 700。'),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_elm_lang$html$Html$br,
																														{ctor: '[]'},
																														{ctor: '[]'}),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('新しく root shot が追加される。再使用20秒。'),
																														_1: {
																															ctor: '::',
																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																{
																																	ctor: '::',
																																	_0: 'Level 18 - Bola Shot 1 - 12秒間 root - 4s cast - 2100 range',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 28 - Bola Shot 2 - 20秒間 root - 4s cast - 2100 range',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 38 - Bola Shot 3 - 28秒間 root - 4s cast - 2100 range',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Level 48 - Bola Shot 4 - 36秒間 root - 4s cast - 2100 range',
																																				_1: {ctor: '[]'}
																																			}
																																		}
																																	}
																																}),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('新しく snare shot が追加される。'),
																																_1: {
																																	ctor: '::',
																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																		{
																																			ctor: '::',
																																			_0: 'Level 45 - Patella Shot - 15秒間 melee hinder - 15s 再使用 - 4s cast - 2100 range',
																																			_1: {ctor: '[]'}
																																		}),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('Point Blank Shot は以下のようになる。Point Blank Shot はブロックされない。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																				{
																																					ctor: '::',
																																					_0: 'Level 16 - Point Blank Shot 1 - 74 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 12秒ごと、同時に 22% haste buff',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 26 - Point Blank Shot 2 - 134 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 10秒ごと、同時に 30% haste buff',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 36 - Point Blank Shot 3 - 195 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 8秒ごと、同時に 39% haste buff',
																																							_1: {ctor: '[]'}
																																						}
																																					}
																																				}),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('Poison shot は除去される。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _elm_lang$html$Html$text('Acid shot は射程が 1500 に減少し 350 半径 AoE になる。'),
																																					_1: {
																																						ctor: '::',
																																						_0: A2(
																																							_elm_lang$html$Html$br,
																																							{ctor: '[]'},
																																							{ctor: '[]'}),
																																						_1: {
																																							ctor: '::',
																																							_0: _elm_lang$html$Html$text('Siege Shot はダメージが増加する。'),
																																							_1: {
																																								ctor: '::',
																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																									{
																																										ctor: '::',
																																										_0: 'Siege Shot 1 - ダメージ増加 2 から 7',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Seige Shot 2 - ダメージ増加 7 から 21',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Siege Shot 3 - ダメージ増加 15 から 42',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Siege Shot 4 - ダメージ増加 21 から 60',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Siege Shot 5 - ダメージ増加 26 から 75',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Siege Shot 6 - ダメージ増加 37 から 90',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Siege Shot 7 - ダメージ増加 42 から 105',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Siege Shot 8 - ダメージ増加 47 から 125',
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}),
																																								_1: {
																																									ctor: '::',
																																									_0: _elm_lang$html$Html$text('Long Shot は cast speed debuff を持つ。'),
																																									_1: {
																																										ctor: '::',
																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																											{
																																												ctor: '::',
																																												_0: 'Long Shot 1 - 3% cast speed debuff - 40秒間継続',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Long Shot 2 - 6% cast speed debuff - 40秒間継続',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Long Shot 3 - 9% cast speed debuff - 40秒間継続',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Long Shot 4 - 12% cast speed debuff - 40秒間継続',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Long Shot 5 - 15% cast speed debuff - 40秒間継続',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Long Shot 6 - 18% cast speed debuff - 40秒間継続',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'Long Shot 7 - 21% cast speed debuff - 40秒間継続',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: 'Long Shot 8 - 24% cast speed debuff - 40秒間継続',
																																																			_1: {ctor: '[]'}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('新しいスペル Track が追加される。再使用30秒。ステルス中のみ詠唱可能。'),
																																											_1: {
																																												ctor: '::',
																																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																													{
																																														ctor: '::',
																																														_0: 'Level 20 - 15% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 30 - 25% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 40 - 35% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Level 50 - 45% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}),
																																												_1: {
																																													ctor: '::',
																																													_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Beastcraft (スペック)'),
																																													_1: {
																																														ctor: '::',
																																														_0: _elm_lang$html$Html$text('ペットが行う自己バフはプレイヤーが上書きできない。ペットの自己バフは25% buff effectiveness ボーナスで効果を計算される。'),
																																														_1: {
																																															ctor: '::',
																																															_0: _elm_lang$html$Html$text('ペットは召喚時に自動で str/con buff および haste buff を行う。'),
																																															_1: {
																																																ctor: '::',
																																																_0: _elm_lang$html$Html$text('Hunter\'s Avatar, Elder Protector, Elder Avatar ペットは Critical Strike スタイルを使用する。anytime snare と side stun の可能性がある。'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _elm_lang$html$Html$text('Hunter\'s Protector ペット (level 20) もスタイルを使用する。'),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: A2(
																																																			_elm_lang$html$Html$br,
																																																			{ctor: '[]'},
																																																			{ctor: '[]'}),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _elm_lang$html$Html$text('ハンターのペットは unbreakable snare を詠唱する。'),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																					{
																																																						ctor: '::',
																																																						_0: 'Level 20 - Gleipnir\'s Wish - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間2秒 - 再使用90秒',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: 'Level 35 - Gleipnir\'s Will - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間4秒 - 再使用90秒',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'Level 50 - Gleipnir\'s Command - instant cast - ペットから 1500 range - 60s pet buff - 次の攻撃は 40% unbreakable snare を proc する - 持続時間6秒 - 再使用90秒',
																																																								_1: {ctor: '[]'}
																																																							}
																																																						}
																																																					}),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _elm_lang$html$Html$text('新しい呪文が追加される。'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																							{
																																																								ctor: '::',
																																																								_0: 'Level 2 - Wolfen Frenzy - Instant cast - ペット対象 50% celerity buff, 25% damage done buff, -25% absorption debuff. 持続時間30秒, 再使用60秒',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'ペットコマンド“Frenzy”は削除される。',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _elm_lang$html$Html$text('召喚ペットの再使用時間が変更される。'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																									{
																																																										ctor: '::',
																																																										_0: 'Level 32 - Hunter\'s Avatar - 1分45秒',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'Level 40 - Hunter\'s Elder Protector - 90秒',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'Level 50 - Hunter\'s Elder Avatar - 60秒',
																																																												_1: {ctor: '[]'}
																																																											}
																																																										}
																																																									}),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _elm_lang$html$Html$text('低レベルペットの再使用時間は2分のままである。'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																												{
																																																													ctor: '::',
																																																													_0: 'Level 15 - Aurora - Northern Lights - ダメージやや増加',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: 'Level 29 - Rush - Side - 15秒 hinder',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'Level 50 - Ragnarok - Rear - ダメージかなり増加',
																																																															_1: {ctor: '[]'}
																																																														}
																																																													}
																																																												}),
																																																											_1: {ctor: '[]'}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Hunter$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Hunter$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Hunter$patch_1_121B,
		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Hunter$patch_1_121C, _Ragamuffine$daoc_patch_notes$Hunter$patch_1_122B)));

var _Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('インフィルトレーター 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('インフィルトレーターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Stealth (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レベル49 Vanish III は Vanish II に変更される。したがって再使用タイマーは15分になる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('インフィルトレーター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('インフィルトレーターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('インフィルトレーターはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('スペックポイントが 2.5 から 2.9 になる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('レルムアビリティー Mastery of Magery を選択可能になる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Vanish はレルムアビリティーではなく Stealth スペックに含まれる。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Mastery of Stealth はレルムアビリティーではなく Stealth スペックの Shadow Seek になる。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('アサシンはレルムアビリティー Determination と Strike Prediction を選択可能になる。'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('アサシンから Heightened Awareness, Blood Rage, Subtlety アビリティーが除去される。'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Remedy は再使用 5 分となり HP を失うことはなくなる。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Viper の値が変更になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 1 - 10% から 5% へ',
															_1: {
																ctor: '::',
																_0: 'Level 2 - 20% から 10% へ',
																_1: {
																	ctor: '::',
																	_0: 'Level 3 - 35% から 20% へ',
																	_1: {
																		ctor: '::',
																		_0: 'Level 4 - 50% から 30% へ',
																		_1: {
																			ctor: '::',
																			_0: 'Level 5 - 75% から 40% へ',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Stealth (スペック)'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しく Shadow Seek が追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 10 - Shadow Seek I - instant cast - 永久 - 5% 検知ボーナス',
																		_1: {
																			ctor: '::',
																			_0: 'Level 15 - Shadow Seek II - instant cast - 永久 - 10% 検知ボーナス',
																			_1: {
																				ctor: '::',
																				_0: 'Level 20 - Shadow Seek III - instant cast - 永久 - 15% 検知ボーナス',
																				_1: {
																					ctor: '::',
																					_0: 'Level 25 - Shadow Seek IV - instant cast - 永久 - 20% 検知ボーナス',
																					_1: {
																						ctor: '::',
																						_0: 'Level 30 - Shadow Seek V - instant cast - 永久 - 25% 検知ボーナス',
																						_1: {
																							ctor: '::',
																							_0: 'Level 35 - Shadow Seek VI - instant cast - 永久 - 30% 検知ボーナス',
																							_1: {
																								ctor: '::',
																								_0: 'Level 40 - Shadow Seek VII - instant cast - 永久 - 35% 検知ボーナス. 自動的に Shadow Seek I を得る。ステルス状態で通常移動速度の 70%',
																								_1: {
																									ctor: '::',
																									_0: 'Level 45 - Shadow Seek VIII - instant cast - 永久 - 40% 検知ボーナス. 自動的に Shadow Seek II を得る。ステルス状態で通常移動速度の 85%',
																									_1: {
																										ctor: '::',
																										_0: 'Level 50 - Shadow Seek IX - instant cast - 永久 - 45% 検知ボーナス. 自動的に Shadow Seek III を得る。ステルス状態で通常移動速度の 100%',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Detect Hidden と Assassinate アビリティーは除去される。'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Save Fall V はレベル 50 から 48 になる。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$br,
																				{ctor: '[]'},
																				{ctor: '[]'}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('新しく Overshadow がレベル 49 に追加される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: '味方を一人ステルスにする - 10秒間継続 - 戦闘・非戦闘状態を問わず - Instant cast - 1000 range - 自分には不可 - 味方は移動できるが戦闘状態になるとステルスを失う',
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Vanish レルムアビリティーが利用できる。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Vanish 1 - 29 stealth - 再使用15分',
																									_1: {
																										ctor: '::',
																										_0: 'Vanish 2 - 39 stealth - 再使用15分',
																										_1: {
																											ctor: '::',
																											_0: 'Vanish 3 - 49 stealth - 再使用10分',
																											_1: {ctor: '[]'}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Vanish はステルスボーナスと引き換えに poison cure を行う。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Vanish の disarm 時間は silence と同じ15秒となる。'),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$br,
																											{ctor: '[]'},
																											{ctor: '[]'}),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('Blur がレベル50 に追加される。'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'ターゲットの場所に移動する - プレイヤーであること(敵味方は問わない) - 1000 range - 90s 再使用 - root/snare 状態でも可能だが CC は維持される - ステルスかどうかに関わらず使用可能 - 275 unit から 800 unit の距離のターゲットには使えない',
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Envenom (スペック)'),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('毒は武器に適用するアイテムではなくなった。'),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('毒は Envenom スペックで習得する offensive proc buff である。'),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('この offensive proc は 100% 発動しレジストできない。'),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('この offensive proc buff はステルス中でも詠唱可能でステルス状態を維持する。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('poison proc buff を持った状態で2つの武器を使用しても発動するのは一度だけである。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('ただし別のターゲットに対して毒を適用することはできる。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('poison proc は武器の proc と干渉しない。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _elm_lang$html$Html$text('クロスボーやML以外の投擲武器では proc しない。'),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('同一ターゲットに二重に毒を適用することはできない。'),
																																						_1: {
																																							ctor: '::',
																																							_0: A2(
																																								_elm_lang$html$Html$br,
																																								{ctor: '[]'},
																																								{ctor: '[]'}),
																																							_1: {
																																								ctor: '::',
																																								_0: _elm_lang$html$Html$text('poison proc buff には以下の 6 種類ある。'),
																																								_1: {
																																									ctor: '::',
																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																										{
																																											ctor: '::',
																																											_0: 'Effectiveness poison: melee dps + attack speed debuff',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Withering poison: disease + melee resistance debuff',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Stat debuff poison: weapon skill + all stats debuff',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Damaging poison: DoT',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Shadowbind poison: snare',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Tranquilizing poison: mesmerization',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}),
																																									_1: {
																																										ctor: '::',
																																										_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing 以外の毒の再使用タイマーは 7 秒である。'),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing は独立したタイマーを持ち、それぞれ 7 秒と 25 秒である。'),
																																											_1: {
																																												ctor: '::',
																																												_0: _elm_lang$html$Html$text('mezz poison は Spymaster から除去される。'),
																																												_1: {
																																													ctor: '::',
																																													_0: A2(
																																														_elm_lang$html$Html$br,
																																														{ctor: '[]'},
																																														{ctor: '[]'}),
																																													_1: {
																																														ctor: '::',
																																														_0: _elm_lang$html$Html$text('Effectiveness Poison: ターゲットの物理攻撃ダメージと攻撃スピードの debuff. 20 秒継続。'),
																																														_1: {
																																															ctor: '::',
																																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																{
																																																	ctor: '::',
																																																	_0: '3 Envenom - Minor Essence of Lethargy. melee damage 4% attack speed 5%.',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: '13 Envenom - Weak Essence of Lethargy. melee damage 6% attack speed 10%.',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: '23 Envenom - Essence of Lethargy. melee damage 10% attack speed 15%.',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: '33 Envenom - Major Essence of Lethargy. melee damage 15% attack speed 20%.',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '43 Envenom - Swordbreaker. melee damage 20% attack speed by 25%.',
																																																					_1: {ctor: '[]'}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}),
																																															_1: {
																																																ctor: '::',
																																																_0: _elm_lang$html$Html$text('Withering Poison: disease. 15 秒継続。'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																		{
																																																			ctor: '::',
																																																			_0: '4 Envenom - Minor Widow Sting. Diseased, 15% slow strength 5',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: '16 Envenom - Widow Sting. Diseased, 15% slow strength 10.',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '26 Envenom - Widow Toxin. Diseased, 15% slow, strength 15, melee resistance 5%.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '36 Envenom - Widow Toxin. Diseased, 15% slow, strength 20, melee resistance 10%.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '46 Envenom - Widow Venom. Diseased, 15% slow, strength 25, melee resistance 20%.',
																																																							_1: {ctor: '[]'}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _elm_lang$html$Html$text('Stat debuff Poison: Weaponskill, Dexterity, Strength, Constitution debuff. 30 秒間継続。'),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																				{
																																																					ctor: '::',
																																																					_0: '7 Envenom - Weakening Poison. WS 5%, stat 13.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '17 Envenom - Inhibiting Poison. WS 8%, stat 24.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '27 Envenom - Enervating Poison. WS 10%, stat 30.',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '37 Envenom - Unnerving Poison. WS 14%, stat 41.',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '47 Envenom - Touch of Death. WS 19%, stat 60.',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _elm_lang$html$Html$text('Snare Poison: snare poison には root/snare タイマーが適用されない。再使用すると上書きされる。'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																						{
																																																							ctor: '::',
																																																							_0: '9 Envenom - Crippling Toxin. Snare 15%, 4 秒間',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '29 Envenom - Snaring Toxin. Snare 35%, 6 秒間',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '49 Envenom - Shadowbind. Snare 60%, 9 秒間',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _elm_lang$html$Html$text('Mez Poison: 再使用時間25秒で独立したタイマーを持つ。この poison は bodyguard されているターゲットにも有効。半径 500 内のすべてのターゲットに有効で mezz 時間短縮バフの影響を受けない。mez poison は他の poison と違って同じターゲットに再適用できる。'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																								{
																																																									ctor: '::',
																																																									_0: '18 Envenom - Tranquilizing Gas - 5秒間継続 PBAoE mez.',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: '46 Envenom - Tranquilizing Miasma - 15秒間継続 PBAoE mez.',
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _elm_lang$html$Html$text('Damage-over-Time Poison: 20 秒間継続。'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																										{
																																																											ctor: '::',
																																																											_0: '1 Envenom - Minor Lethal Poison. 9 body damage, 3.9 秒ごと',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: '5 Envenom - Lesser Lethal Poison. 15 body damage every 3.9 seconds.',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: '10 Envenom - Lethal Poison. 22 body damage every 3.9 seconds.',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: '15 Envenom - Major Lethal Poison. 29 body damage 3.9 seconds.',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: '20 Envenom - Greater Lethal Poison. 36 body damage 3.9 seconds.',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: '25 Envenom - Minor Lethal Venom. 36 body damage, 14 matter damage, 3.9 秒ごと',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: '30 Envenom - Lesser Lethal Venom. 38 body damage, 22 matter damage, 3.9 秒ごと',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: '35 Envenom - Major Lethal Venom. 42 body damage, 30 matter damage, 3.9 秒ごと',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: '40 Envenom - Greater Lethal Venom. 50 body damage, 39 matter damage, 3.9 秒ごと',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: '45 Envenom - Insidious Lethal Venom. 72 body damage, 48 matter damage, 3.9 秒ごと',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: '50 Envenom - Lifebane. 88 body damage, 55 matter damage, 3.9 秒ごと',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Critical Strike (スペック)'),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _elm_lang$html$Html$text('Armor Wither はレジスト不可になる。'),
																																																											_1: {
																																																												ctor: '::',
																																																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																													{
																																																														ctor: '::',
																																																														_0: 'Level 8 - Pincer - Side - 4s melee stun',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'Level 10 - Backstab 2 - Rear - ダメージやや増加',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'Level 12 - Hamstring - Evade - 20% attack speed debuff, ダメージやや増加',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 18 - Garrote - Anytime - 14 damage bleed, ダメージ減少',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 21 - Perforate Artery - Frontal stealth - ダメージかなり増加, 10秒間継続 armor wither',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 25 - Achilles Heel - rear - 10秒間継続 armor wither, ダメージ増加',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 29 - Leaper - Pincer - 1% ABS debuff, ダメージやや増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 39 - Stunning Stab - Creeping Death - 3% ABS debuff',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 44 - Rib Separation - Achilles Heel - 7s melee stun, ダメージかなり増加',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 45 - Incapacitate style は除去される。',
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'Level 46 - Neck Shot - anytime - ダメージやや軽減, helm armor slot',
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'Level 47 - Rib Shot - anytime - ダメージやや軽減, chest armor slot',
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'Level 48 - Hip Shot - anytime - ダメージやや軽減, leggings armor slot',
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: 'Level 50 - Ripper - Garrote - 20秒間継続 armor wither, ダメージやや増加',
																																																																											_1: {ctor: '[]'}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}),
																																																												_1: {
																																																													ctor: '::',
																																																													_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Dual Wield (スペック)'),
																																																													_1: {
																																																														ctor: '::',
																																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																															{
																																																																ctor: '::',
																																																																_0: 'Level 21 - Penumbra - Rear - 26% attack speed debuff, スタイルダメージ増加',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 34 - Dark Tendrils - Anytime - ダメージ減少',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 39 - Shadow\'s Rain - Flank - ダメージやや増加',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 50 - Dual Shadows - Front - ダメージやや増加',
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	}
																																																																}
																																																															}),
																																																														_1: {
																																																															ctor: '::',
																																																															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Slash (スペック)'),
																																																															_1: {
																																																																ctor: '::',
																																																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																	{
																																																																		ctor: '::',
																																																																		_0: 'Level 34 - Amethyst Slash - Anytime - ダメージ減少',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 39 - Backslash - Rear - スネア除去, ダメージやや増加',
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	}),
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Thrust (スペック)'),
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																			{
																																																																				ctor: '::',
																																																																				_0: 'Level 29 - Pierce - Rear - スネア除去, ダメージやや増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 34 - Liontooth - Anytime - ダメージ減少',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			}),
																																																																		_1: {ctor: '[]'}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Infiltrator$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_121, _Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Mauler$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('モーラー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('モーラーは変更されません。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Mauler$all = _Ragamuffine$daoc_patch_notes$Mauler$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Mentalist$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('メンタリスト 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('メンタリストはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Mana Magic (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しく group power regen が追加される。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Level 25 DoT Lesser Mind Melt は Level 27 になる。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Mentalism (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('single target mez は以下のように変更される。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 23 mez の持続時間は 40 秒になる。',
										_1: {
											ctor: '::',
											_0: 'Level 31 mez の持続時間は 50 秒になる。',
											_1: {
												ctor: '::',
												_0: 'Level 41 mez の持続時間は 60 秒になる。',
												_1: {
													ctor: '::',
													_0: 'Level 50 mez Unmake Mind は削除される。',
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Mentalist$all = _Ragamuffine$daoc_patch_notes$Mentalist$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('マーセナリー 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('RR5 Blinding Dust は以下のように変更される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: '名称が Dissolute Swings になる。',
					_1: {
						ctor: '::',
						_0: '持続時間が15秒から30秒になる。',
						_1: {
							ctor: '::',
							_0: 'Crush/Slash/Thrust weaponskill を50%増加させる。',
							_1: {
								ctor: '::',
								_0: 'stat debuff をすべて除去する。RR5 中は stat debuff を受けない。',
								_1: {
									ctor: '::',
									_0: 'マーセナリー自身が evade または parry する確率が大幅に減少する。',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Dirty Tricks の proc に 500 半径 pbaoe, -50% nearsight, 15秒継続が付加される。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('マーセナリー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('マーセナリーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('マーセナリーはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('マーセナリーのレルムアビリティーからチャージがなくなる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('マーセナリーはレベル上昇に伴ってチャージを習得する。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 30 - Charge 1',
								_1: {
									ctor: '::',
									_0: 'Level 35 - Charge 2',
									_1: {
										ctor: '::',
										_0: 'Level 40 - Charge 3',
										_1: {
											ctor: '::',
											_0: 'Level 45 - Charge 4',
											_1: {
												ctor: '::',
												_0: 'Level 50 - Charge 5',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Light Tank Stance'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$dl,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('uk-description-list-horizontal'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$dt,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('Way of the Mercenary'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$dd,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$dt,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Way of the Soldier'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$dd,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$dt,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Way of the Rogue'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$dd,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Dual Wield (スペック)'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 21 - Penumbra - Rear - スネア削除, 26% attack speed debuff 追加, ダメージやや増加',
													_1: {
														ctor: '::',
														_0: 'Level 29 - Misty Gloom - Flank - ダメージ増加',
														_1: {
															ctor: '::',
															_0: 'Level 39 - Shadow\'s Rain - Side - ダメージやや増加',
															_1: {
																ctor: '::',
																_0: 'Level 34 - Dark Tendrils - Anytime - スタイルダメージ減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 44 - Hypnotic Darkness - Reflection - ダメージ増加、攻撃ボーナス減少、低防御ボーナス',
																	_1: {
																		ctor: '::',
																		_0: 'Level 50 - Dark Shadows - Penumbra - 30% attack speed debuff, スタイルダメージ増加',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Slash (スペック)'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 34 - Amethyst Slash - Anytime - ダメージ減少',
															_1: {
																ctor: '::',
																_0: 'Level 39 - Backslash - Rear - スネア削除, ダメージやや増加',
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Thrust (スペック)'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 29 - Pierce - Rear - スネア削除, スタイルダメージ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 34 - Liontooth - Anytime - ダメージ減少',
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Crush (スペック)'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 21 - Protector - Anytime - ダメージ減少',
																			_1: {
																				ctor: '::',
																				_0: 'Level 25 - Divine Hammer - Rear - スネア削除, ダメージやや増加',
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Mercenary$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121, _Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121C);

var _Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ミンストレル 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シージチャントは正しくグループメンバーに効果を及ぼすようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ミンストレル 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ミンストレルはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Instruments (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しくグループシージダメージ低減オーラが追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 6 - Ballad of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 10% 低下',
							_1: {
								ctor: '::',
								_0: 'Level 16 - Chant of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 20% 低下',
								_1: {
									ctor: '::',
									_0: 'Level 26 - Chorus of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 30% 低下',
									_1: {
										ctor: '::',
										_0: 'Level 36 - Song of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 40% 低下',
										_1: {
											ctor: '::',
											_0: 'Level 46 - Anthem of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 50% 低下 - 同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しく siege へのグループダメージボーナスが追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。',
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Minstrel$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ミンストレル 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ミンストレルはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Instruments (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい speed buff を追加'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Crescendo, realm target, instant-cast, 7秒間継続, 130% speed buff, 34 Music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
							_1: {
								ctor: '::',
								_0: 'Great Crescendo, realm target, instant-cast, 9秒間継続, 160% speed buff, 44 music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Single target flute mez の効果は33%短縮される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 50: 29 から 20 秒へ',
									_1: {
										ctor: '::',
										_0: 'Level 36: 26 から 18 秒へ',
										_1: {
											ctor: '::',
											_0: 'Level 24: 20 から 14 秒へ',
											_1: {
												ctor: '::',
												_0: 'Level 18: 17 から 12 秒へ',
												_1: {
													ctor: '::',
													_0: 'Level 9 : 12 から 8 秒へ',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('ただし flute mez の実際の効果は倍になる。例えば level 50 での20秒 mez は実際には 40秒になる。'),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Minstrel$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Minstrel$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B, _Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B_HotFix2));

var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix4 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.122B Hot Fix #4'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Plated Fiend ペットの移動速度がやや低下する。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Painworking (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('背後スタイル Frozen Edge のデバフ量は45%から35%に減少する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('スタイル Deathseeker のダメージは 100/tick から 75/tick に減少する。頻度は2秒ごとから2.5秒ごとになる。持続時間10秒は変わらない。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('レベル37 DoT Freezing Clench のダメージは 74/tick から 64/tick に減少する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('レベル47 Dot Freezing Howl のダメージは 132/tick から 112/tick に減少する。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Netherbane の DoT proc のダメージは 185/tick から 145/tick に減少する。頻度は2秒ごとから2.5秒ごとになる。持続時間10秒は変わらない。'),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.122B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('レベル50の Deathsight の能力 Bringer of Death の持続時間は30秒から20秒に短縮される。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Chthonic Form のヒットポイントとAFの増加は Spear of King などのHP/AF増加効果と再びスタックするようになる。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Chthonic Form の AF バフはレベル50以下では効果が低下する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'レベル 20-34 では 25 AF',
									_1: {
										ctor: '::',
										_0: 'レベル 35-44 では 75 AF',
										_1: {
											ctor: '::',
											_0: 'レベル 45-49 では 125 AF',
											_1: {
												ctor: '::',
												_0: 'レベル 50 では 250 AF (以前と同じ)',
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('plated fiend ペットの物理防御は減少する。'),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Chthonic Form がランダムに解除されることがなくなる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Painworking の parry バフの低レベルのものは Chthonic Form 固有の parry 確率を正しく書き換えるようになる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Nethersbane はログアウト時に正しく消滅するようになる。また Painworking のレベルが50未満で装備しようとした場合も消滅する。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Death Servant のボルトのダメージが大きすぎたバグが修正される。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Spirit Form のステルス検知半径は Death Servant のスキル値に影響を受けるようになる。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。'),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.122B Hot Fix'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Revert Form はスキルリストに正しく表示される。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('設置型スペル(〜 Ground)はターゲットの場所に設置され設置直後から半径内で有効になる。設置後はパルスのタイミングで効果を発する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Chthonic Form はすべてのレベルで正しく parry と weaponskill を得る。召喚したペットを正しくリリースする。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Decrepit Form の health regen はレベル50では変わらないがレベルが下がるごとに効果は低下する。バトルグラウンドで効力が強すぎたため調整される。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Power Lock は正しく詠唱者をスタンするようになる。このスタンはパージ不能で耐性もつかない。'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('概略'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサーはスペックごとに3つの「クラス」を持つとさえ言える。純キャスター、物理/キャスターハイブリッド、ペットキャスター。以前のネクロマンサーはシェード状態の本体は無敵でペットを制御するクラスであったがそのような特徴はもはやない。物理攻撃を行うスペックが導入されたことから STR や QUICKNESS を上げる装備が必要に感じるかもしれないが単純化のため物理ダメージと weaponskill は INT により計算される。新しいネクロマンサー向けのアイテムは今後導入される。'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('ネクロマンサーはフルリスペックされる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('ネクロマンサーはレルムアビリティーをリスペックされる。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('ネクロマンサーはチャンピオンアビリティーをリスペックされる。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('マスターレベルアビリティーはログイン時に自動的にリスペックされる。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Master Levels'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Warlord',
												_1: {
													ctor: '::',
													_0: 'Convoker',
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Realm Abilities'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Augmented Strength',
														_1: {
															ctor: '::',
															_0: 'Augmented Dexterity',
															_1: {
																ctor: '::',
																_0: 'Augmented Constitution',
																_1: {
																	ctor: '::',
																	_0: 'Augmented Quickness',
																	_1: {
																		ctor: '::',
																		_0: 'Augmented Acuity',
																		_1: {
																			ctor: '::',
																			_0: 'Long Wind',
																			_1: {
																				ctor: '::',
																				_0: 'Serenity',
																				_1: {
																					ctor: '::',
																					_0: 'Toughness',
																					_1: {
																						ctor: '::',
																						_0: 'Ethereal Bond',
																						_1: {
																							ctor: '::',
																							_0: 'Avoidance of Magic',
																							_1: {
																								ctor: '::',
																								_0: 'Lifter',
																								_1: {
																									ctor: '::',
																									_0: 'Veil Recovery',
																									_1: {
																										ctor: '::',
																										_0: 'Mastery of Pain',
																										_1: {
																											ctor: '::',
																											_0: 'Mastery of Magery',
																											_1: {
																												ctor: '::',
																												_0: 'Mastery of Focus',
																												_1: {
																													ctor: '::',
																													_0: 'Mastery of Parrying',
																													_1: {
																														ctor: '::',
																														_0: 'Wild Power',
																														_1: {
																															ctor: '::',
																															_0: 'Wild Minion',
																															_1: {
																																ctor: '::',
																																_0: 'Determination',
																																_1: {
																																	ctor: '::',
																																	_0: 'First Aid',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Second Wind',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Ignore Pain',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Mastery of Concentration',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Concentration',
																																					_1: {
																																						ctor: '::',
																																						_0: 'The Empty Mind',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Mystic Crystal Lore',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Raging Power',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Soldier\'s Barricade',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Volcanic Pillar',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Negative Maelstrom',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Ichor of the Deep',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Juggernaut',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Dual Threat',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Purge',
																																															_1: {ctor: '[]'}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Realm Rank 5'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Call of Darkness - Instant cast - 持続時間45秒 - 再使用10分 - すべての form の利益を得る。さらに form のボーナスは 10% 増加する。ただし RR5 終了時に自動的に元の form には戻らない。',
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('General'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('ネクロマンサーの King 装備および Epic 装備の proc とアビリティーは他のクラスに沿って調整される。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しいアビリティーが追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Revert Form - Instant cast - 再使用2秒 - 元の form に戻る。',
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Deathsight (基本)'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しい form が追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 1 - Decrepit Form - Instant cast - 20% power - 再使用2秒 - Decrepit Magus になる。魔法ダメージ10%増加。ABS+5増加。物理攻撃した対象は病気になる。戦闘中であっても高い比率で体力が自然回復する。',
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('新しい単体 DoT が追加される。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Level 2 - Locust Flock - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 2 matter damage',
																										_1: {
																											ctor: '::',
																											_0: 'Level 12 - Locust Cloud - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 10 matter damage',
																											_1: {
																												ctor: '::',
																												_0: 'Level 22 - Locust Mass - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 29 matter damage',
																												_1: {
																													ctor: '::',
																													_0: 'Level 32 - Locust Horde - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 69 matter damage',
																													_1: {
																														ctor: '::',
																														_0: 'Level 42 - Locust Flock - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 102 matter damage',
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('新しい単体ライフタップが追加される。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Level 3 - Lifeforce Evacuation - 詠唱2.5秒 - 1500 range - 3 power - 17 spirit damage ダメージの50%を回復',
																												_1: {
																													ctor: '::',
																													_0: 'Level 9 - Spirit Evacuation - 詠唱2.5秒 - 1500 range - 5 power - 33 spirit damage ダメージの50%を回復',
																													_1: {
																														ctor: '::',
																														_0: 'Level 19 - Vitality Theft - 詠唱2.5秒 - 1500 range - 13 power - 73 spirit damage ダメージの50%を回復',
																														_1: {
																															ctor: '::',
																															_0: 'Level 29 - Theft of Vigor - 詠唱2.5秒 - 1500 range - 18 power - 92 spirit damage ダメージの50%を回復',
																															_1: {
																																ctor: '::',
																																_0: 'Level 39 - Theft of Energy - 詠唱2.5秒 - 1500 range - 24 power - 126 spirit damage ダメージの50%を回復',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 49 - Theft of Liveliness - 詠唱2.5秒 - 1500 range - 33 power - 179 spirit damage ダメージの50%を回復',
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}
																											}),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('新しい設置型スペルが追加される。'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'Level 6 - Decrepit Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 20 power - 2秒ごとに10% slow',
																														_1: {
																															ctor: '::',
																															_0: 'Level 16 - Wretched Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 30 power - 2秒ごとに20% slow',
																															_1: {
																																ctor: '::',
																																_0: 'Level 26 - Rotting Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 45 power - 2秒ごとに40% slow',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 36 - Desecrated Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 62 power - 2秒ごとに55% slow',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 46 - Decrepit Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 75 power - 2秒ごとに75% slow',
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}
																														}
																													}),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('すべての設置型スペルは共通のタイマーを持つ。同時に一つのスペルのみが有効である。duration ボーナスは設置型スペルに影響しない。'),
																													_1: {
																														ctor: '::',
																														_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Deathsight (スペック)'),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('新しく AoE DoT スペルが追加される。'),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																	{
																																		ctor: '::',
																																		_0: 'Level 1 - Billowing Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 6 power - 2 spirit damage',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 7 - Flowing Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 18 power -17 spirit damage',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Level 17 - Unending Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 30 power - 30 spirit damage',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 27 - Swelling Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 42 power - 60 spirit damage',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 37 - Heightening Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 3秒ごと - 50 power - 88 spirit damage',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 47 - Infinite Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 2.5秒ごと - 64 power - 131 spirit damage',
																																							_1: {ctor: '[]'}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('新しい単体 slow が追加される。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																			{
																																				ctor: '::',
																																				_0: 'Level 2 - Crippling Exhaustion - Instant cast - 再使用3分 - 1500 range - 持続時間30秒 - 25% power - slow 10%',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 12 - Constricting Exhaustion - Instant cast - 再使用3分 - 1500 range - 持続時間30秒 - 25% power - slow 15%',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 22 - Disabling Exhaustion - Instant cast - 再使用2分 - 1500 range - 持続時間30秒 - 25% power - slow 20%',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 32 - Debilitating Exhaustion - Instant cast - 再使用60秒 - 1500 range - 持続時間30秒 - 25% power - slow 25%',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Level 42 - Snaring Exhaustion - Instant cast - 再使用60秒 - 1500 range - 持続時間30秒 - 25% power - slow 30%',
																																								_1: {ctor: '[]'}
																																							}
																																						}
																																					}
																																				}
																																			}),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('新しく単体 AF デバフが追加される。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																					{
																																						ctor: '::',
																																						_0: 'Level 3 - Glimpse of the Inevitable - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 8 power - AF 25 低下',
																																						_1: {
																																							ctor: '::',
																																							_0: 'Level 13 - Glimpse of Chaos - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 17 power - AF 55 低下',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Level 23 - Glimpse of the Grave - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 25 power - AF 100 低下',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Level 33 - Glimpse of Nightmares - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 36 power - AF 165 低下',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Level 43 - Glimpse of Death - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 50 power - AF 250 低下',
																																										_1: {ctor: '[]'}
																																									}
																																								}
																																							}
																																						}
																																					}),
																																				_1: {
																																					ctor: '::',
																																					_0: _elm_lang$html$Html$text('新しく PBAoE スペルが追加される。'),
																																					_1: {
																																						ctor: '::',
																																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																							{
																																								ctor: '::',
																																								_0: 'Level 5 - Channeled Anger - 詠唱2.5秒 - 半径300 - 22 power - 52 spirit damage',
																																								_1: {
																																									ctor: '::',
																																									_0: 'Level 15 - Channeled Hatred - 詠唱2.5秒 - 半径300 - 30 power - 104 spirit damage',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Level 25 - Channeled Fury - 詠唱2.5秒 - 半径300 - 46 power - 176 spirit damage',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Level 35 - Channeled Wrath - 詠唱2.5秒 - 半径300 - 58 power - 265 spirit damage',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Level 45 - Channeled Frenzy - 詠唱2.5秒 - 半径300 - 70 power - 325 spirit damage',
																																												_1: {ctor: '[]'}
																																											}
																																										}
																																									}
																																								}
																																							}),
																																						_1: {
																																							ctor: '::',
																																							_0: _elm_lang$html$Html$text('新しく単体 root が追加される。Albion の root はすべて energy 属性。'),
																																							_1: {
																																								ctor: '::',
																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																									{
																																										ctor: '::',
																																										_0: 'Level 9 - Minor Body Lock - 詠唱2.5秒 - 1500 range - 持続時間7秒 - 15 power',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Level 19 - Lesser Body Lock - 詠唱2.5秒 - 1500 range - 持続時間19秒 - 28 power',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Level 29 - Body Lock - 詠唱2.5秒 - 1500 range - 持続時間48秒 - 48 power',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Level 39 - Greater Body Lock - 詠唱2.5秒 - 1500 range - 持続時間61秒 - 60 power',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 49 - Superior Body Lock - 詠唱2.5秒 - 1500 range - 持続時間73秒 - 72 power',
																																														_1: {ctor: '[]'}
																																													}
																																												}
																																											}
																																										}
																																									}),
																																								_1: {
																																									ctor: '::',
																																									_0: _elm_lang$html$Html$text('新しい魔法クリティカルグループオーラが追加される。'),
																																									_1: {
																																										ctor: '::',
																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																											{
																																												ctor: '::',
																																												_0: 'Level 6 - Magic Empowerment - 詠唱時間3秒 - 1500 range - 24 power + 5/tick - すべての魔法のクリティカル確率を1%増加',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Level 16 - Evil Empowerment - 詠唱時間3秒 - 1500 range - 40 power + 8/tick - すべての魔法のクリティカル確率を2%増加',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 26 - Dark Empowerment - 詠唱時間3秒 - 1500 range - 60 power + 10/tick - すべての魔法のクリティカル確率を3%増加',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 36 - Deadly Empowerment - 詠唱時間3秒 - 1500 range - 80 power + 15/tick - すべての魔法のクリティカル確率を4%増加',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 46 - Necrotic Empowerment - 詠唱時間3秒 - 1500 range - 100 power + 25/tick - すべての魔法のクリティカル確率を5%増加',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('ブレードターンが追加される。'),
																																											_1: {
																																												ctor: '::',
																																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																													{
																																														ctor: '::',
																																														_0: 'Level 23 - Death Bladeturn - 詠唱4秒 - 持続時間20分 - 8% power - 物理攻撃を一度だけ吸収する。',
																																														_1: {ctor: '[]'}
																																													}),
																																												_1: {
																																													ctor: '::',
																																													_0: _elm_lang$html$Html$text('新しい form が追加される。'),
																																													_1: {
																																														ctor: '::',
																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																															{
																																																ctor: '::',
																																																_0: 'Level 50 - Bringer of Death - Instant cast - 再使用15分 - 持続時間25秒 - 0 power - Bringer of Death になる。魔法の妨害を受けなくなる。あらゆるダメージを30%低減する。スピードワープ、戦闘中であっても移動速度は25%増加する。Decrepit Form のすべてのボーナスは有効である。',
																																																_1: {ctor: '[]'}
																																															}),
																																														_1: {
																																															ctor: '::',
																																															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Painworking (基本)'),
																																															_1: {
																																																ctor: '::',
																																																_0: _elm_lang$html$Html$text('新しい form が追加される。'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																		{
																																																			ctor: '::',
																																																			_0: 'Level 8 - Chthonic Form - Instant cast - 20% power - 再使用2秒 - Chthonic Knight になる。最大HPが30%増加する。ABS+25される。parry アビリティーが追加される。weaponskill がレベル50で50%増加する。AF が250増加する。AFを除いてこれらの数値は Painworking スペックに比例する。',
																																																			_1: {ctor: '[]'}
																																																		}),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _elm_lang$html$Html$text('新しく constitution デバフが追加される。'),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																				{
																																																					ctor: '::',
																																																					_0: 'Level 4 - Dark Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 5 power - constitution 11 低下',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: 'Level 14 - Vile Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 20 power - constitution 18 低下',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: 'Level 24 - Mind Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 28 power - constitution 25 低下',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'Level 34 - Evil Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 34 power - constitution 31 低下',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'Level 44 - Demon Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 48 power - constitution 41 低下',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _elm_lang$html$Html$text('新しくダメージシールドが追加される。'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																						{
																																																							ctor: '::',
																																																							_0: 'Level 7 - Edge of Hatred - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象に 5.8 spirit damage',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'Level 17 - Eviscerating Protector - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 8.9 spirit damage',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'Level 27 - Knives of Death - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 11.6 spirit damage',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: 'Level 37 - Flaying Shield - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 15.3 spirit damage',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'Level 47 - Soul Sundering Shield - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象に 21.1 spirit damage',
																																																											_1: {ctor: '[]'}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _elm_lang$html$Html$text('新しい設置型スペルが追加される。'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																								{
																																																									ctor: '::',
																																																									_0: 'Level 1 - Icy Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 12 power - 3秒ごとに 8 cold damage 最大16体まで',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: 'Level 11 - Chilling Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 28 power - 3秒ごとに 66 cold damage 最大16体まで',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'Level 21 - Frigid Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 45 power - 3秒ごとに 129 cold damage 最大16体まで',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'Level 31 - Numbing Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 54 power - 3秒ごとに 192 cold damage 最大16体まで',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: 'Level 41 - Freezing Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 62 power - 3秒ごとに 252 cold damage 最大16体まで',
																																																													_1: {ctor: '[]'}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _elm_lang$html$Html$text('すべての設置型スペルは再使用タイマーを共有する。同時に一つの設置型スペルのみ有効である。duration ボーナスは設置型スペルには効果がない。'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Painworking (スペック)'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _elm_lang$html$Html$text('新しく単体 slow が追加される。'),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																												{
																																																													ctor: '::',
																																																													_0: 'Level 11 - Ice Bond - 1000 range - 持続時間1秒 - 再使用60秒 - 10% power - slow 80%',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: 'Level 21 - Ice Cable - 1000 range - 持続時間2秒 - 再使用60秒 - 10% power - slow 80%',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'Level 31 - Ice Chain - 1000 range - 持続時間3秒 - 再使用60秒 - 10% power - slow 80%',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'Level 41 - Ice Bracelet- 1000 range - 持続時間4秒 - 再使用60秒 - 10% power - slow 80%',
																																																																_1: {ctor: '[]'}
																																																															}
																																																														}
																																																													}
																																																												}),
																																																											_1: {
																																																												ctor: '::',
																																																												_0: _elm_lang$html$Html$text('新しく魔法抵抗増加スペルが追加される。'),
																																																												_1: {
																																																													ctor: '::',
																																																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																														{
																																																															ctor: '::',
																																																															_0: 'Level 2 - Anti-Magic Skin - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗10%増加',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'Level 12 - Anti-Magic Shell - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗20%増加',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 22 - Anti-Magic Armor - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗30%増加',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 32 - Anti-Magic Wall - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗40%増加',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 42 - Anti-Magic Barrier - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗50%増加',
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}),
																																																													_1: {
																																																														ctor: '::',
																																																														_0: _elm_lang$html$Html$text('新しく魔法吸収パルスが追加される。'),
																																																														_1: {
																																																															ctor: '::',
																																																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																{
																																																																	ctor: '::',
																																																																	_0: 'Level 4 - Soul of Magic - Instant cast - 持続時間30秒 - 30秒ごと - 15% power + 5/tick - 次に受けた魔法攻撃は回復になる',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 14 - Sense of Magic - Instant cast - 持続時間25秒 - 25秒ごと - 15% power + 8/tick - 次に受けた魔法攻撃は回復になる',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 24 - Awareness of Magic - Instant cast - 持続時間20秒 - 20秒ごと - 15% power + 10/tick - 次に受けた魔法攻撃は回復になる',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 34 - Expectancy of Magic - Instant cast - 14s duration - 14秒ごと - 15% power + 12/tick - 次に受けた魔法攻撃は回復になる',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 44 - Way of Magic - Instant cast - 持続時間9秒 - 9秒ごと - 15% power + 15/tick - 次に受けた魔法攻撃は回復になる',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}),
																																																															_1: {
																																																																ctor: '::',
																																																																_0: _elm_lang$html$Html$text('新しく自己 parry 強化スペルが追加される。'),
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																		{
																																																																			ctor: '::',
																																																																			_0: 'Level 5 - Nails of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 8 power - parry 確率 30% 増加',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 15 - Barbs of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 22 power - parry 確率 35% 増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 25 - Fangs of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 30 power - parry 確率 40% 増加',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 35 - Blades of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 42 power - parry 確率 45% 増加',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 45 - Swords of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 50 power - parry 確率が 60% になる',
																																																																							_1: {ctor: '[]'}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}),
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: _elm_lang$html$Html$text('新しく単体デバフ耐性スペルが追加される。'),
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																				{
																																																																					ctor: '::',
																																																																					_0: 'Level 9 - Ignore Weakness - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は25%の確率でデバフを無効化',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 19 - Ignore Debilitation - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は35%の確率でデバフを無効化',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 29 - Ignore Infirmity - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は50%の確率でデバフを無効化',
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'Level 39 - Ignore Impunities - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は70%の確率でデバフを無効化',
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'Level 49 - Ignore Depletion - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は100%の確率でデバフを無効化',
																																																																									_1: {ctor: '[]'}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}),
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: _elm_lang$html$Html$text('新しい melee スタイルが追加される。'),
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																						{
																																																																							ctor: '::',
																																																																							_0: 'Level 1 - Villainous Strike - Anytime - Medium Endurance - Medium Damage - Low Hit Bonus - No Defensive Bonus - ターゲットのAFは1%低下する。何度でも重複する。',
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'Level 3 - Chilling Touch - High Endurance - Medium Damage - No Hit Bonus - Medium Defensive Penalty - 10秒間 5% の確率で evade',
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'Level 13 - Shadow Beckon - Taunt - Low Endurance - No Hit Bonus - Low Defensive Bonus - 脅威度200増加',
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'Level 16 - Arctic Death - Parry - Medium Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - ターゲットの攻撃速度が20秒間18%低下(バグ: このスキルはトレーニング直後は見えない。リログがゾーンが必要。)',
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: 'Level 23 - Icebringer - Side - Medium Endurance - High Damage - Medium Hit Bonus - No Defensive Bonus - ターゲットに病気を与える。20秒間 slow 15%, STR 15低下、ヒール効率50%低下',
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: 'Level 26 - Vanquisher - Follows Return Death - Very High Damage - High Hit Bonus - No Defensive Bonus - ターゲットから ablative shield をすべて除去する',
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: 'Level 33 - Icy Cleave - Front - Very High Endurance - Medium Damage - No Hit Bonus - Medium Defensive Bonus - 前方の敵すべてに 55 cold damage を与える。脅威度 50 増加',
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: 'Level 36 - Frozen Edge - Behind - Medium Endurance - High Damage - Medium Hit Bonus - No Defensive Bonus - ターゲットの cold resistances を15秒間 45% 低下',
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: 'Level 43 - Frostbite - Follows Icebringer - Low Endurance - Very High Damage - Medium Hit Bonus - Low Defensive Bonus - 7秒スタン',
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: 'Level 46 - Deathseeker - Follows Frozen Edge - High Endurance - Very High Damage - High Hot Bonus - No Defensive Bonus - ターゲットは出血し 10秒間 2秒ごとに 100 cold damage',
																																																																																_1: {ctor: '[]'}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}),
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: _elm_lang$html$Html$text('新しいペットが追加される。'),
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																								{
																																																																									ctor: '::',
																																																																									_0: 'Level 40 - Summon Death Shredder - Instant Cast - 持続時間60秒 - 20% power - 再使用5分 - Death Shredder を召喚する。Death Shredder は melee dps に特化したペットであり、ブレードターンバフを持っている。ペットは召喚者のレベルと等しい。',
																																																																									_1: {ctor: '[]'}
																																																																								}),
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: _elm_lang$html$Html$text('新しく単体 AoE DoT/slowスペルが追加される。'),
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																										{
																																																																											ctor: '::',
																																																																											_0: 'Level 7 - Freezing Hold - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用60秒 - 12 power - 2秒ごと 5 cold damage',
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: 'Level 17 - Freezing Grasp - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用60秒 - 24 power - 2秒ごと 11 cold damage 5% slow',
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: 'Level 27 - Freezing Terror - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用30秒 - 38 power - 2秒ごと 30 cold damage 10% slow',
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: 'Level 37 - Freezing Clench - Instant cast - 500 range - 半径250 - 持続時間10秒 - 15s reuse - 52 power - 2秒ごと 74 cold damage 15% slow',
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: 'Level 47 - Freezing Howl - Instant cast - 500 range - 半径250 - 持続時間10秒 - 15s reuse - 65 power - 1.5秒ごと 132 cold damage 25% slow',
																																																																															_1: {ctor: '[]'}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}),
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: _elm_lang$html$Html$text('新しく武器召喚スペルが追加される。'),
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																												{
																																																																													ctor: '::',
																																																																													_0: 'Level 1 - Conjure Icebrand - 詠唱10秒 - 25% power - Chthonic Blade を召喚する。ダメージ属性は cold',
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: 'Level 50 - Nethersbane - 詠唱20秒 - 50% power - アラウンの邪悪な剣 Nethersbane を召喚する。ダメージ属性は cold である。weaponskill とスタイルダメージは Painworking スペックと Intelligence に依存する。Nethersbane は時間の経過につれて強化され最強の両手剣と同等の性能になる。ネクロマンサーが装備できるのは杖と召喚武器のみである。Nethersbane はログアウト時に消滅する。',
																																																																														_1: {ctor: '[]'}
																																																																													}
																																																																												}),
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Death Servant (基本)'),
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: _elm_lang$html$Html$text('新しい form が追加される。'),
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: A2(
																																																																															_elm_lang$html$Html$ul,
																																																																															{
																																																																																ctor: '::',
																																																																																_0: _elm_lang$html$Html_Attributes$class('uk-list uk-list-striped'),
																																																																																_1: {ctor: '[]'}
																																																																															},
																																																																															{
																																																																																ctor: '::',
																																																																																_0: _elm_lang$html$Html$text('Level 30 - Spirit Form - Instant cast - 20% power - 再使用2秒 - Ghostly Spirit になる。受けたダメージの 10% をパワーに変換する。パワー regeneration が大きく強化されている。隠れた敵を容易に発見できる。それに加え、ペットはより強力な能力と形態を持つ。'),
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																		{
																																																																																			ctor: '::',
																																																																																			_0: 'Spirit Form でいる間はペットのレジストは55%まで増加する。このレジストはクレリック/フライアーのレジストと重複しない。',
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: 'ペットはどの形態であっても通常形態の能力とボーナスを持ったままでいる。',
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: 'Spirit Form を解くとペットは通常形態に戻る。',
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: 'Spirit Form は本質的にチャントであり長時間スタンまたは mezz 状態であればペットのコントロールを失う。またペットとの距離が離れすぎてもコントロールを失う。再び条件が満たされればコントロールを取り戻す。',
																																																																																						_1: {ctor: '[]'}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}),
																																																																																	_1: {ctor: '[]'}
																																																																																}
																																																																															}),
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: _elm_lang$html$Html$text('ペットは召喚者と同じレベルになる。ペットはレベルに応じて能力も向上する。'),
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: A2(
																																																																																	_elm_lang$html$Html$br,
																																																																																	{ctor: '[]'},
																																																																																	{ctor: '[]'}),
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: _elm_lang$html$Html$text('召喚者が人間、Decrepit Form, Spirit Form である時のみペットを召喚できる。Chthonic Form ではペットを召喚できない。またすでにペットがいればコントロールを失う。'),
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: A2(
																																																																																			_elm_lang$html$Html$br,
																																																																																			{ctor: '[]'},
																																																																																			{ctor: '[]'}),
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: _elm_lang$html$Html$text('新しいペットが追加される。'),
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																					{
																																																																																						ctor: '::',
																																																																																						_0: 'Level 5 - Summon Aegis - 詠唱6秒 - 40% power - このペットはタンクである。他のAFバフとスタックするAFバフを持つ。スラッシュ属性の物理スタイル Umbral Slash でタウントする。',
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: 'Spirit Form ではペットの魔法レジストが増加する。物理攻撃速度が上がる。Umbral Slash は Spirit Slash となり半径200の範囲に 80 heat DD を proc する。',
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: 'Level 15 - Summon Soultorn - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。matter スネア DD で攻撃する。matter デバフも行う。このペットを妨害することはできない。',
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: 'Spirit Form ではすべてのティックが妨害を行う matter DoT を詠唱する。同様に病気とスネアも行う。1 ティックが通常形態の 1 DD に等しい。このペットはとても脆い。',
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: 'Level 25 - Summon Fiend - 詠唱6秒 - 40% power - このペットは高速で移動し物理攻撃を行う。物理スタイル Fanatic Slash は高ダメージを与える。',
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: 'Spirit Form では Fanatic Slash は Rabid Swipe になりターゲットに対して ABS デバフ 35%, AF デバフ 150 を行う。ダメージも増加する。Frenzy Swipes は 5 秒背後スタンでかつ高ダメージを与える。このペットは戦闘中やスピードワープの中でも速度が変わらない。',
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: 'Level 35 - Summon Priest - 詠唱6秒 - 40% power - このペットはグループをサポートするペットである。味方単体の体力、スタミナ、パワーを回復する。このペットは妨害可能である。',
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: 'Spirit Form ではヒールだけではなく病気、毒、近視、蘇生痕の回復も行う。',
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: 'Level 45 - Summon Succubus - 詠唱6秒 - 40% power - このペットはクラウドコントロールを行う。射程1250、持続時間46秒の単体 mezz を行う。このペットは妨害することができない。',
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: 'Spirit Form では射程1500、持続時間72秒の AoE mezz を行う。AoE Dex/Qui デバフも行う。自分の近視を回復する。',
																																																																																															_1: {ctor: '[]'}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}),
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: _elm_lang$html$Html$text('新しく heal over time が追加される。'),
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																							{
																																																																																								ctor: '::',
																																																																																								_0: 'Level 1 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 4 回復',
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: 'Level 8 - Regenerate Blood - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 9 回復',
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: 'Level 18 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 27 回復',
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: 'Level 28 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 51 回復',
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: 'Level 38 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 61 回復',
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: 'Level 48 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 76 回復',
																																																																																													_1: {ctor: '[]'}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}),
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: _elm_lang$html$Html$text('新しくパワードレインが追加される。'),
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																									{
																																																																																										ctor: '::',
																																																																																										_0: 'Level 7 - Power Drain - Instant cast - 再使用20秒 - 1500 range - 29 spirit damage 与えたダメージの 250% をパワーとして得る',
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: 'Level 17 - Power Vacuum - Instant cast - 再使用20秒 - 1500 range - 68 spirit damage 与えたダメージの 250% をパワーとして得る',
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: 'Level 27 - Power Leech - Instant cast - 再使用20秒 - 1500 range - 29 spirit damage 与えたダメージの 250% をパワーとして得る',
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: 'Level 37 - Power Siphon - Instant cast - 再使用20秒 - 1500 range - 124 spirit damage 与えたダメージの 250% をパワーとして得る',
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: 'Level 47 - Power Absorb - Instant cast - 再使用20秒 - 1500 range - 159 spirit damage 与えたダメージの 250% をパワーとして得る',
																																																																																														_1: {ctor: '[]'}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}),
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: _elm_lang$html$Html$text('新しい設置型スペルを追加する。'),
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																											{
																																																																																												ctor: '::',
																																																																																												_0: 'Level 4 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 20 power - 持続時間30秒 - すべての味方は6秒ごとに 5 パワーを得る。戦闘中でも有効。',
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: 'Level 14 - Infused Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 44 power - 持続時間30秒 - すべての味方は6秒ごとに 11 パワーを得る。戦闘中でも有効。',
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: 'Level 24 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 65 power - 持続時間30秒 - すべての味方は6秒ごとに 20 パワーを得る。戦闘中でも有効。',
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: 'Level 34 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 80 power - 持続時間30秒 - すべての味方は6秒ごとに 28 パワーを得る。戦闘中でも有効。',
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: 'Level 44 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 100 power - 持続時間30秒 - すべての味方は6秒ごとに 35 パワーを得る。戦闘中でも有効。',
																																																																																																_1: {ctor: '[]'}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}),
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: _elm_lang$html$Html$text('すべての設置型スペルはタイマーを共有する。同時に一つの設置型スペルのみが有効である。duration ボーナスは設置型スペルには効果がない。'),
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Death Servant (スペック)'),
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: _elm_lang$html$Html$text('新しく単体パワー転送スペルが追加される。'),
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																															{
																																																																																																ctor: '::',
																																																																																																_0: 'Level 1 - Gift of Power - 詠唱時間3秒 - 1500 range - ターゲットに 25 power 転送する。',
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: 'Level 11 - Gift of Essence - 詠唱時間3秒 - 1500 range - ターゲットに 40 power 転送する。',
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: 'Level 21 - Gift of Force - 詠唱時間3秒 - 1500 range - ターゲットに 70 power 転送する。',
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: 'Level 31 - Gift of Vim - 詠唱時間3秒 - 1500 range - ターゲットに 105 power 転送する。',
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: 'Level 41 - Gift of Arawn - 詠唱時間3秒 - 1500 range - ターゲットに 150 power 転送する。',
																																																																																																				_1: {ctor: '[]'}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}),
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: _elm_lang$html$Html$text('新しく単体ペット fear (退散後に60秒の無効時間が発生する)が追加される。'),
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																	{
																																																																																																		ctor: '::',
																																																																																																		_0: 'Level 2 - Fear Servant - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: 'Level 12 - Expel Servant - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - Send an enemy pet running in fear, causing its master to lose control.',
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: 'Level 22 - Intimidate Servant - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - Send an enemy pet running in fear, causing its master to lose control.',
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: 'Level 32 - Daunt Servant - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - Send an enemy pet running in fear, causing its master to lose control.',
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: 'Level 42 - Terrify Servant - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - Send an enemy pet running in fear, causing its master to lose control.',
																																																																																																						_1: {ctor: '[]'}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}),
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: _elm_lang$html$Html$text('新しく単体ボルト呪文が追加される。'),
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																			{
																																																																																																				ctor: '::',
																																																																																																				_0: 'Level 4 - Power Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 30 power - 23 spirit damage',
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: 'Level 14 - Focus Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 100% power - 50 spirit damage',
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: 'Level 24 - Essence Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 100% power - 156 spirit damage',
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: 'Level 34 - Death Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 110% power - 250 spirit damage',
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: 'Level 44 - Final Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 133% power - 317 spirit damage',
																																																																																																								_1: {ctor: '[]'}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}),
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: _elm_lang$html$Html$text('新しく単体ABSバフが追加される。'),
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																					{
																																																																																																						ctor: '::',
																																																																																																						_0: 'Level 8 - Ambition for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +1',
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: 'Level 18 - Hunger for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +2',
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: 'Level 28 - Longing for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +5',
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: 'Level 38 - Communion for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +7',
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: 'Level 48 - Intimacy for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +10',
																																																																																																										_1: {ctor: '[]'}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}),
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: _elm_lang$html$Html$text('新しく単体 DD/スネアが追加される。'),
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																							{
																																																																																																								ctor: '::',
																																																																																																								_0: 'Level 9 - Plague Burst - 詠唱2.8秒 - 1500 range - 6 power - 34 matter damage 5% snare',
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: 'Level 19 - Plague Trap - 詠唱2.8秒 - 1500 range - 14 power - 68 matter damage 15% snare',
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: 'Level 29 - Plague Torrent - 詠唱2.8秒 - 1500 range - 30 power - 122 matter damage 20% snare',
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: 'Level 39 - Plague Barrage - 詠唱2.8秒 - 1500 range - 46 power - 153 matter damage 35% snare',
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: 'Level 49 - Plague Surge - 詠唱2.8秒 - 1500 range - 66 power - 199 matter damage 50% snare',
																																																																																																												_1: {ctor: '[]'}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}),
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: _elm_lang$html$Html$text('ブレードターンが追加される。'),
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																									{
																																																																																																										ctor: '::',
																																																																																																										_0: 'Level 23 - Death Bladeturn - 詠唱4秒 - 持続時間20分 - 8% power - 物理攻撃を一度だけ吸収する。',
																																																																																																										_1: {ctor: '[]'}
																																																																																																									}),
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: _elm_lang$html$Html$text('新しく PBAoE パワードレインが追加される。'),
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																											{
																																																																																																												ctor: '::',
																																																																																																												_0: 'Level 25 - Power Vortex - Self - Instant cast - 再使用30秒 - 半径350 - 100 damage 100 power',
																																																																																																												_1: {ctor: '[]'}
																																																																																																											}),
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: _elm_lang$html$Html$text('新しくパワーシールドが追加される。'),
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																													{
																																																																																																														ctor: '::',
																																																																																																														_0: 'Level 35 - Power Shield - Instant cast - 永久 - 詠唱者の体力が50%を切ると50%を超えるまでパワーが体力に変換される。',
																																																																																																														_1: {ctor: '[]'}
																																																																																																													}),
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: _elm_lang$html$Html$text('新しく単体グラップルが追加される。'),
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																															{
																																																																																																																ctor: '::',
																																																																																																																_0: 'Level 45 - Power Lock - Instant cast - 350 range - 持続時間10秒 - 再使用90秒 - 自分とターゲットの場所を固定する。毎秒50パワーをターゲットから吸収する。自分とターゲットは物理ダメージを受けない。',
																																																																																																																_1: {ctor: '[]'}
																																																																																																															}),
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: _elm_lang$html$Html$text('新しく打ちっ放し型のペットを召喚する。'),
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																																																																	{
																																																																																																																		ctor: '::',
																																																																																																																		_0: 'Level 50 - Arawn\'s Legion - 詠唱時間15秒 - 再使用10分 - 半径2000 - 0 power - 持続時間45秒 - ペットの軍団を召喚する。ペットは範囲内の敵を攻撃する。ペットの種類は物理型からキャスター型まで多岐にわたる。',
																																																																																																																		_1: {ctor: '[]'}
																																																																																																																	}),
																																																																																																																_1: {ctor: '[]'}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ネクロマンサー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ネクロマンサーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Death Servant (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい shade-cast PBAoE スペルを追加'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 47 - Necrotic Conduit - 225 damage, 350 半径 PBAoE - 20% power cost - 3s shade-cast, pet instant-cast - shade は pet から 250 以内でなければならない',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('これまでの level 47 PBAoE スペル, Channeled Frenzy, は level 46 になる。'),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Necromancer$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix2,
				A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix3, _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix4)))));

var _Ragamuffine$daoc_patch_notes$Nightshade$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ナイトシェード 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ナイトシェードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Stealth (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レベル49 Vanish III は Vanish II に変更される。したがって再使用タイマーは15分になる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Nightshade$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ナイトシェード 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ナイトシェードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ナイトシェードはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('スペックポイントが 2.2 から 2.8 になる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('ナイトシェードは Wild Power レルムアビリティーを習得できなくなる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Vanish はレルムアビリティーではなく Stealth スペックに含まれる。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Mastery of Stealth はレルムアビリティーではなく Stealth スペックの Shadow Seek になる。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('アサシンはレルムアビリティー Determination と Strike Prediction を選択可能になる。'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('アサシンから Heightened Awareness, Blood Rage, Subtlety アビリティーが除去される。'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Remedy は再使用 5 分となり HP を失うことはなくなる。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Viper の値が変更になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 1 - 10% から 5% へ',
															_1: {
																ctor: '::',
																_0: 'Level 2 - 20% から 10% へ',
																_1: {
																	ctor: '::',
																	_0: 'Level 3 - 35% から 20% へ',
																	_1: {
																		ctor: '::',
																		_0: 'Level 4 - 50% から 30% へ',
																		_1: {
																			ctor: '::',
																			_0: 'Level 5 - 75% から 40% へ',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Stealth (スペック)'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しく Shadow Seek が追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 10 - Shadow Seek I - instant cast - 永久 - 5% 検知ボーナス',
																		_1: {
																			ctor: '::',
																			_0: 'Level 15 - Shadow Seek II - instant cast - 永久 - 10% 検知ボーナス',
																			_1: {
																				ctor: '::',
																				_0: 'Level 20 - Shadow Seek III - instant cast - 永久 - 15% 検知ボーナス',
																				_1: {
																					ctor: '::',
																					_0: 'Level 25 - Shadow Seek IV - instant cast - 永久 - 20% 検知ボーナス',
																					_1: {
																						ctor: '::',
																						_0: 'Level 30 - Shadow Seek V - instant cast - 永久 - 25% 検知ボーナス',
																						_1: {
																							ctor: '::',
																							_0: 'Level 35 - Shadow Seek VI - instant cast - 永久 - 30% 検知ボーナス',
																							_1: {
																								ctor: '::',
																								_0: 'Level 40 - Shadow Seek VII - instant cast - 永久 - 35% 検知ボーナス. 自動的に Shadow Seek I を得る。ステルス状態で通常移動速度の 70%',
																								_1: {
																									ctor: '::',
																									_0: 'Level 45 - Shadow Seek VIII - instant cast - 永久 - 40% 検知ボーナス. 自動的に Shadow Seek II を得る。ステルス状態で通常移動速度の 85%',
																									_1: {
																										ctor: '::',
																										_0: 'Level 50 - Shadow Seek IX - instant cast - 永久 - 45% 検知ボーナス. 自動的に Shadow Seek III を得る。ステルス状態で通常移動速度の 100%',
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Detect Hidden と Assassinate アビリティーは除去される。'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Save Fall V はレベル 50 から 48 になる。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$br,
																				{ctor: '[]'},
																				{ctor: '[]'}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('新しく Overshadow がレベル 49 に追加される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: '味方を一人ステルスにする - 10秒間継続 - 戦闘・非戦闘状態を問わず - Instant cast - 1000 range - 自分には不可 - 味方は移動できるが戦闘状態になるとステルスを失う',
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Vanish レルムアビリティーが利用できる。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Vanish 1 - 29 stealth - 再使用15分',
																									_1: {
																										ctor: '::',
																										_0: 'Vanish 2 - 39 stealth - 再使用15分',
																										_1: {
																											ctor: '::',
																											_0: 'Vanish 3 - 49 stealth - 再使用10分',
																											_1: {ctor: '[]'}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Vanish はステルスボーナスと引き換えに poison cure を行う。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Vanish の disarm 時間は silence と同じ15秒となる。'),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$br,
																											{ctor: '[]'},
																											{ctor: '[]'}),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('Blur がレベル50 に追加される。'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'ターゲットの場所に移動する - プレイヤーであること(敵味方は問わない) - 1000 range - 90s 再使用 - root/snare 状態でも可能だが CC は維持される - ステルスかどうかに関わらず使用可能 - 275 unit から 800 unit の距離のターゲットには使えない',
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Envenom (スペック)'),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('毒は武器に適用するアイテムではなくなった。'),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('毒は Envenom スペックで習得する offensive proc buff である。'),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('この offensive proc は 100% 発動しレジストできない。'),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('この offensive proc buff はステルス中でも詠唱可能でステルス状態を維持する。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('poison proc buff を持った状態で2つの武器を使用しても発動するのは一度だけである。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('ただし別のターゲットに対して毒を適用することはできる。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('poison proc は武器の proc と干渉しない。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _elm_lang$html$Html$text('クロスボーやML以外の投擲武器では proc しない。'),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('同一ターゲットに二重に毒を適用することはできない。'),
																																						_1: {
																																							ctor: '::',
																																							_0: A2(
																																								_elm_lang$html$Html$br,
																																								{ctor: '[]'},
																																								{ctor: '[]'}),
																																							_1: {
																																								ctor: '::',
																																								_0: _elm_lang$html$Html$text('poison proc buff には以下の 6 種類ある。'),
																																								_1: {
																																									ctor: '::',
																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																										{
																																											ctor: '::',
																																											_0: 'Effectiveness poison: melee dps + attack speed debuff',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Withering poison: disease + melee resistance debuff',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Stat debuff poison: weapon skill + all stats debuff',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Damaging poison: DoT',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Shadowbind poison: snare',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Tranquilizing poison: mesmerization',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}),
																																									_1: {
																																										ctor: '::',
																																										_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing 以外の毒の再使用タイマーは 7 秒である。'),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing は独立したタイマーを持ち、それぞれ 7 秒と 25 秒である。'),
																																											_1: {
																																												ctor: '::',
																																												_0: _elm_lang$html$Html$text('mezz poison は Spymaster から除去される。'),
																																												_1: {
																																													ctor: '::',
																																													_0: A2(
																																														_elm_lang$html$Html$br,
																																														{ctor: '[]'},
																																														{ctor: '[]'}),
																																													_1: {
																																														ctor: '::',
																																														_0: _elm_lang$html$Html$text('Effectiveness Poison: ターゲットの物理攻撃ダメージと攻撃スピードの debuff. 20 秒継続。'),
																																														_1: {
																																															ctor: '::',
																																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																{
																																																	ctor: '::',
																																																	_0: '3 Envenom - Minor Essence of Lethargy. melee damage 4% attack speed 5%.',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: '13 Envenom - Weak Essence of Lethargy. melee damage 6% attack speed 10%.',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: '23 Envenom - Essence of Lethargy. melee damage 10% attack speed 15%.',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: '33 Envenom - Major Essence of Lethargy. melee damage 15% attack speed 20%.',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '43 Envenom - Swordbreaker. melee damage 20% attack speed by 25%.',
																																																					_1: {ctor: '[]'}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}),
																																															_1: {
																																																ctor: '::',
																																																_0: _elm_lang$html$Html$text('Withering Poison: disease. 15 秒継続。'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																		{
																																																			ctor: '::',
																																																			_0: '4 Envenom - Minor Widow Sting. Diseased, 15% slow strength 5',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: '16 Envenom - Widow Sting. Diseased, 15% slow strength 10.',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '26 Envenom - Widow Toxin. Diseased, 15% slow, strength 15, melee resistance 5%.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '36 Envenom - Widow Toxin. Diseased, 15% slow, strength 20, melee resistance 10%.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '46 Envenom - Widow Venom. Diseased, 15% slow, strength 25, melee resistance 20%.',
																																																							_1: {ctor: '[]'}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _elm_lang$html$Html$text('Stat debuff Poison: Weaponskill, Dexterity, Strength, Constitution debuff. 30 秒間継続。'),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																				{
																																																					ctor: '::',
																																																					_0: '7 Envenom - Weakening Poison. WS 5%, stat 13.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '17 Envenom - Inhibiting Poison. WS 8%, stat 24.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '27 Envenom - Enervating Poison. WS 10%, stat 30.',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '37 Envenom - Unnerving Poison. WS 14%, stat 41.',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '47 Envenom - Touch of Death. WS 19%, stat 60.',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _elm_lang$html$Html$text('Snare Poison: snare poison には root/snare タイマーが適用されない。再使用すると上書きされる。'),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																						{
																																																							ctor: '::',
																																																							_0: '9 Envenom - Crippling Toxin. Snare 15%, 4 秒間',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '29 Envenom - Snaring Toxin. Snare 35%, 6 秒間',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '49 Envenom - Shadowbind. Snare 60%, 9 秒間',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						}),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _elm_lang$html$Html$text('Mez Poison: 再使用時間25秒で独立したタイマーを持つ。この poison は bodyguard されているターゲットにも有効。半径 500 内のすべてのターゲットに有効で mezz 時間短縮バフの影響を受けない。mez poison は他の poison と違って同じターゲットに再適用できる。'),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																								{
																																																									ctor: '::',
																																																									_0: '18 Envenom - Tranquilizing Gas - 5秒間継続 PBAoE mez.',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: '46 Envenom - Tranquilizing Miasma - 15秒間継続 PBAoE mez.',
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _elm_lang$html$Html$text('Damage-over-Time Poison: 20 秒間継続。'),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																										{
																																																											ctor: '::',
																																																											_0: '1 Envenom - Minor Lethal Poison. 9 body damage, 3.9 秒ごと',
																																																											_1: {
																																																												ctor: '::',
																																																												_0: '5 Envenom - Lesser Lethal Poison. 15 body damage every 3.9 seconds.',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: '10 Envenom - Lethal Poison. 22 body damage every 3.9 seconds.',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: '15 Envenom - Major Lethal Poison. 29 body damage 3.9 seconds.',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: '20 Envenom - Greater Lethal Poison. 36 body damage 3.9 seconds.',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: '25 Envenom - Minor Lethal Venom. 36 body damage, 14 matter damage, 3.9 秒ごと',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: '30 Envenom - Lesser Lethal Venom. 38 body damage, 22 matter damage, 3.9 秒ごと',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: '35 Envenom - Major Lethal Venom. 42 body damage, 30 matter damage, 3.9 秒ごと',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: '40 Envenom - Greater Lethal Venom. 50 body damage, 39 matter damage, 3.9 秒ごと',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: '45 Envenom - Insidious Lethal Venom. 72 body damage, 48 matter damage, 3.9 秒ごと',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: '50 Envenom - Lifebane. 88 body damage, 55 matter damage, 3.9 秒ごと',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Critical Strike (スペック)'),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _elm_lang$html$Html$text('Armor Wither はレジスト不可になる。'),
																																																											_1: {
																																																												ctor: '::',
																																																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																													{
																																																														ctor: '::',
																																																														_0: 'Level 8 - Pincer - Side - 4s melee stun',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'Level 10 - Backstab 2 - Rear - ダメージやや増加',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'Level 12 - Hamstring - Evade - 20% attack speed debuff, ダメージやや増加',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 18 - Garrote - Anytime - 14 damage bleed, ダメージ減少',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 21 - Perforate Artery - Frontal stealth - ダメージかなり増加, 10秒間継続 armor wither',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 25 - Achilles Heel - rear - 10秒間継続 armor wither, ダメージ増加',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 29 - Leaper - Pincer - 1% ABS debuff, ダメージやや増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 39 - Stunning Stab - Creeping Death - 3% ABS debuff',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 44 - Rib Separation - Achilles Heel - 7s melee stun, ダメージかなり増加',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 45 - Incapacitate style は除去される。',
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'Level 46 - Neck Shot - anytime - ダメージやや軽減, helm armor slot',
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'Level 47 - Rib Shot - anytime - ダメージやや軽減, chest armor slot',
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'Level 48 - Hip Shot - anytime - ダメージやや軽減, leggings armor slot',
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: 'Level 50 - Ripper - Garrote - 20秒間継続 armor wither, ダメージやや増加',
																																																																											_1: {ctor: '[]'}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}),
																																																												_1: {
																																																													ctor: '::',
																																																													_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Celtic Dual (スペック)'),
																																																													_1: {
																																																														ctor: '::',
																																																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																															{
																																																																ctor: '::',
																																																																_0: 'Level 15 - Thunderstorm - Detaunt anytime - Defensive bonus とダメージを他の detaunt スタイル並に減少',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 21 - Hurricane - Rear - スネア削除, ダメージやや増加',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 29 - Tempest - Ice Storm - ダメージやや増加',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 34 - Meteor Shower - Anytime - ダメージ減少',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 50 - Supernova - Hurricane - ダメージやや増加, 7秒スタン',
																																																																				_1: {ctor: '[]'}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}),
																																																														_1: {
																																																															ctor: '::',
																																																															_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Pierce (スペック)'),
																																																															_1: {
																																																																ctor: '::',
																																																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																	{
																																																																		ctor: '::',
																																																																		_0: 'Level 12 - Black Widow - Rear - スネア削除, ダメージやや増加',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 34 - Asp\'s Bite - Anytime - ダメージ減少',
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	}),
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blades (スペック)'),
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																			{
																																																																				ctor: '::',
																																																																				_0: 'Level 34 - Revenging Blade - Rear - スネア削除, ダメージやや増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 44 - Prismatic Blade - Anytime - ダメージ減少',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			}),
																																																																		_1: {ctor: '[]'}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Nightshade$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Nightshade$patch_1_121, _Ragamuffine$daoc_patch_notes$Nightshade$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B_HotFix = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('パラディン 1.122B Hot Fix'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Realm Rank 5 Selfless Devotion の最初の tick が正しく発動するようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('パラディン 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Realm Rank 5 Selfless Devotion は以下のように変更される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'パラディンの能力値は減少しなくなる。',
					_1: {
						ctor: '::',
						_0: 'グループサイズに応じてヒール量が変更される。パラディン自身は常に 100 heal/tick で回復する。2〜5人グループではグループメンバーは 300 heal/tick で回復する。6人以上のグループではグループメンバーは 500 heal/tick で回復する。',
						_1: {
							ctor: '::',
							_0: 'ヒール量は healing effectiveness ボーナスによりボーナス値以上に増加する。',
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Paladin$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('パラディン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('パラディンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('レルムアビリティーに Mastery of Healing が追加される。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レルムアビリティーに Wild Healing が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Shield (スペック)'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 44 - Immobilize - 側面 - 21s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.',
								_1: {
									ctor: '::',
									_0: 'Level 46 - Cripple - 背後 - 23s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.',
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Chants (スペック)'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('グループ endurance バフは pulse になる。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 2 - Chant of Endurance - Instant cast - 8s 再使用 - 2000 range - 3 endurance',
											_1: {
												ctor: '::',
												_0: 'Level 12 - Chant of Stamina - Instant cast - 8s 再使用 - 2000 range - 4 endurance',
												_1: {
													ctor: '::',
													_0: 'Level 22 - Chant of Persistence - Instant cast - 8s 再使用 - 2000 range - 5 endurance',
													_1: {
														ctor: '::',
														_0: 'Level 32 - Chant of Resilience - Instant cast - 8s 再使用 - 2000 range - 6 endurance',
														_1: {
															ctor: '::',
															_0: 'Level 42 - Chant of Perseverance - Instant cast - 8s 再使用 - 2000 range - 7 endurance',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい group instant heal が追加される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 2 - Holy Recovery - Instant cast - 再使用60秒 - 1500 range - 5% power - 25 hit points',
													_1: {
														ctor: '::',
														_0: 'Level 5 - Holy Renewal - Instant cast - 再使用60秒 - 1500 range - 5% power - 50 hit points',
														_1: {
															ctor: '::',
															_0: 'Level 12 - Holy Refreshment - Instant cast - 再使用60秒 - 1500 range - 10% power - 100 hit points',
															_1: {
																ctor: '::',
																_0: 'Level 20 - Holy Restoration - Instant cast - 再使用60秒 - 1500 range - 20% power - 180 hit points',
																_1: {
																	ctor: '::',
																	_0: 'Level 35 - Holy Rejuvenation - Instant cast - 再使用60秒 - 1500 range - 25% power - 250 hit points',
																	_1: {
																		ctor: '::',
																		_0: 'Level 45 - Holy Revitalization - Instant cast - 再使用60秒 - 1500 range - 35% power - 300 hit points',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$br,
													{ctor: '[]'},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('新しい自己 dex バフが追加される。'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 4 - Righteous Dexterity - 3.0s cast - 20m 継続 - 3 power - 12 dex',
																_1: {
																	ctor: '::',
																	_0: 'Level 13 - Righteous Deftness - 3.0s cast - 20m 継続 - 11 power - 22 dex',
																	_1: {
																		ctor: '::',
																		_0: 'Level 21 - Righteous Proficiency - 3.0s cast - 20m 継続 - 16 power - 32 dex',
																		_1: {
																			ctor: '::',
																			_0: 'Level 31 - Virtuous Agility - 3.0s cast - 20m 継続 - 25 power - 42 dex',
																			_1: {
																				ctor: '::',
																				_0: 'Level 47 - Virtuous Fluidity - 3.0s cast - 20m 継続 - 43 power - 52 dex',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しい single target major heal が追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 5 - Major Restoration - 3.2s cast - 2000 range - 5 power - 55 hit points',
																		_1: {
																			ctor: '::',
																			_0: 'Level 8 - Major Recuperation - 3.1s cast - 2000 range - 7 power - 82 hit points',
																			_1: {
																				ctor: '::',
																				_0: 'Level 11 - Major Renewal - 3.0s cast - 2000 range - 9 power - 109 hit points',
																				_1: {
																					ctor: '::',
																					_0: 'Level 14 - Major Revival - 2.9s cast - 2000 range - 11 power - 136 hit points',
																					_1: {
																						ctor: '::',
																						_0: 'Level 18 - Major Resuscitation - 2.8s cast - 2000 range - 14 power - 172 hit points',
																						_1: {
																							ctor: '::',
																							_0: 'Level 25 - Major Reviction - 2.7s cast - 2000 range - 19 power - 235 hit points',
																							_1: {
																								ctor: '::',
																								_0: 'Level 33 - Major Refection - 2.6s cast - 2000 range - 24 power - 307 hit points',
																								_1: {
																									ctor: '::',
																									_0: 'Level 43 - Major Refocillation - 2.5s cast - 2000 range - 30 power - 396 hit points',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('group target resistance chant は除去される。'),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$br,
																			{ctor: '[]'},
																			{ctor: '[]'}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('group target multi-resist chant は除去される。'),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$br,
																					{ctor: '[]'},
																					{ctor: '[]'}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しい single target resistance buff が追加される。このレジストはクレリック、フライアーのレジストとスタックしない。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 27 - Elemental Ward - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 8% 増加',
																								_1: {
																									ctor: '::',
																									_0: 'Level 46 - Elemental Shield - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 12% 増加',
																									_1: {ctor: '[]'}
																								}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Two-Handed (スペック)'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Level 34 - Obfuscate - Anytime - ダメージ減少',
																										_1: {
																											ctor: '::',
																											_0: 'Level 44 - Two Moons - Onslaught - ダメージ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Level 50 - Sun and Moon - Doubler - ダメージ増加',
																												_1: {ctor: '[]'}
																											}
																										}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Paladin$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Paladin$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B, _Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B_HotFix));

var _Ragamuffine$daoc_patch_notes$Ranger$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('レンジャー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Realm Rank 5 アビリティーは再びチャージ中でないターゲットをスタンし、レンジャー自身のスピードを増加させるようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Ranger$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('レンジャー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('レンジャーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('レンジャーはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('すべてのアーチャーは Level 50 で Remedy を得る。Remedy は再使用 5 分でもはや HP を失わない。毒に対する耐性を 60 秒間維持する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('すべてのアーチャーは Mastery of Stealth を獲得する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 10 - Mastery of Stealth 1',
									_1: {
										ctor: '::',
										_0: 'Level 15 - Mastery of Stealth 2',
										_1: {
											ctor: '::',
											_0: 'Level 20 - Mastery of Stealth 3',
											_1: {
												ctor: '::',
												_0: 'Level 25 - Mastery of Stealth 4',
												_1: {
													ctor: '::',
													_0: 'Level 30 - Mastery of Stealth 5',
													_1: {
														ctor: '::',
														_0: 'Level 35 - Mastery of Stealth 6',
														_1: {
															ctor: '::',
															_0: 'Level 40 - Mastery of Stealth 7',
															_1: {
																ctor: '::',
																_0: 'Level 45 - Mastery of Stealth 8',
																_1: {
																	ctor: '::',
																	_0: 'Level 50 - Mastery of Stealth 9',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Mastery of Stealth の移動速度への効果は減少する。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Mastery of Stealth 1 の移動速度は +10% のままである',
											_1: {
												ctor: '::',
												_0: 'Mastery of Stealth 2 の移動速度は +15% から +13% に減少する',
												_1: {
													ctor: '::',
													_0: 'Mastery of Stealth 3 の移動速度は +20% から +16% に減少する',
													_1: {
														ctor: '::',
														_0: 'Mastery of Stealth 4 の移動速度は +25% から +19% に減少する',
														_1: {
															ctor: '::',
															_0: 'Mastery of Stealth 5 の移動速度は +30% から +22% に減少する',
															_1: {
																ctor: '::',
																_0: 'Mastery of Stealth 6 の移動速度は +35% から +25% に減少する',
																_1: {
																	ctor: '::',
																	_0: 'Mastery of Stealth 7 の移動速度は +40% から +28% に減少する',
																	_1: {
																		ctor: '::',
																		_0: 'Mastery of Stealth 8 の移動速度は +45% から +31% に減少する',
																		_1: {
																			ctor: '::',
																			_0: 'Mastery of Stealth 9 の移動速度は +50% から +34% に減少する',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('50 stealth MOS9 を持つアーチャーはステルス中に通常速度の80%で移動する。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Archery (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('damage add スペルは削除される。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Critical Shot のダメージは増加する。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Critical Shot 1 のダメージは 12 から 15 へ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Critical Shot 2 のダメージは 38 から 50 へ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Critical Shot 3 のダメージは 79 から 90 へ増加',
																			_1: {
																				ctor: '::',
																				_0: 'Critical Shot 4 のダメージは 106 から 129 へ増加',
																				_1: {
																					ctor: '::',
																					_0: 'Critical Shot 5 のダメージは 132 から 168 へ増加',
																					_1: {
																						ctor: '::',
																						_0: 'Critical Shot 6 のダメージは 185 から 209 へ増加',
																						_1: {
																							ctor: '::',
																							_0: 'Critical Shot 7 のダメージは 212 から 248 へ増加',
																							_1: {
																								ctor: '::',
																								_0: 'Critical Shot 8 のダメージは 239 から 288 へ増加',
																								_1: {
																									ctor: '::',
																									_0: 'Critical Shot 9 のダメージは 265 から 308 へ増加',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('アーチャーの Critical Shot ペナルティーが -50% から -75% に増加する。'),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Standard Shot は 5 秒から 4.0 秒になる。'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Elemental Shot は 7 秒から 5.0 秒になる。ダメージタイプが以下のようになる。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Hunter: Benthic (cold), Tempestuous (spirit)',
																					_1: {
																						ctor: '::',
																						_0: 'Ranger: Pyroclasmic (heat), Entropic (energy)',
																						_1: {
																							ctor: '::',
																							_0: 'Scout: Lithic (matter), Somatic (body)',
																							_1: {ctor: '[]'}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('Power shot は 6 秒から 3.5 秒になり、dex により修正される。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$br,
																						{ctor: '[]'},
																						{ctor: '[]'}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Power shot のダメージは増加する。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Power Shot 1 のダメージは 12 から 15 へ増加',
																									_1: {
																										ctor: '::',
																										_0: 'Power Shot 2 のダメージは 38 から 50 へ増加',
																										_1: {
																											ctor: '::',
																											_0: 'Power Shot 3 のダメージは 79 から 90 へ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Power Shot 4 のダメージは 106 から 129 へ増加',
																												_1: {
																													ctor: '::',
																													_0: 'Power Shot 5 のダメージは 132 から 168 へ増加',
																													_1: {
																														ctor: '::',
																														_0: 'Power Shot 6 のダメージは 185 から 209 へ増加',
																														_1: {
																															ctor: '::',
																															_0: 'Power Shot 7 のダメージは 212 から 248 へ増加',
																															_1: {
																																ctor: '::',
																																_0: 'Power Shot 8 のダメージは 239 から 288 へ増加',
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Power Shot は bladeturn を貫通する。ブロックされない。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Power shot は再使用20秒となる。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Power shot はアーチャーのダメージペナルティーの対象となる。'),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('Rapid Fire shot は前方 90 度の cone AoE (FAE) となる。半径 700。'),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$br,
																													{ctor: '[]'},
																													{ctor: '[]'}),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('新しく root shot が追加される。再使用20秒。'),
																													_1: {
																														ctor: '::',
																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																															{
																																ctor: '::',
																																_0: 'Level 18 - Bola Shot 1 - 12秒間 root - 4s cast - 2100 range',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 28 - Bola Shot 2 - 20秒間 root - 4s cast - 2100 range',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 38 - Bola Shot 3 - 28秒間 root - 4s cast - 2100 range',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 48 - Bola Shot 4 - 36秒間 root - 4s cast - 2100 range',
																																			_1: {ctor: '[]'}
																																		}
																																	}
																																}
																															}),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('新しく snare shot が追加される。'),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																	{
																																		ctor: '::',
																																		_0: 'Level 45 - Patella Shot - 15秒間 melee hinder - 15s 再使用 - 4s cast - 2100 range',
																																		_1: {ctor: '[]'}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('Point Blank Shot は以下のようになる。Point Blank Shot はブロックされない。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																			{
																																				ctor: '::',
																																				_0: 'Level 16 - Point Blank Shot 1 - 74 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 10秒ごと、同時に 22% haste buff',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 26 - Point Blank Shot 2 - 134 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 8秒ごと、同時に 30% haste buff',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 36 - Point Blank Shot 3 - 195 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 6秒ごと、同時に 39% haste buff',
																																						_1: {ctor: '[]'}
																																					}
																																				}
																																			}),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('Poison shot は除去される。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('Acid shot は射程が 1500 に減少し 350 半径 AoE になる。'),
																																				_1: {
																																					ctor: '::',
																																					_0: A2(
																																						_elm_lang$html$Html$br,
																																						{ctor: '[]'},
																																						{ctor: '[]'}),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('Siege Shot はダメージが増加する。'),
																																						_1: {
																																							ctor: '::',
																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																								{
																																									ctor: '::',
																																									_0: 'Siege Shot 1 - ダメージ増加 2 から 7',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Seige Shot 2 - ダメージ増加 7 から 21',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Siege Shot 3 - ダメージ増加 15 から 42',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Siege Shot 4 - ダメージ増加 21 から 60',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Siege Shot 5 - ダメージ増加 26 から 75',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Siege Shot 6 - ダメージ増加 37 から 90',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Siege Shot 7 - ダメージ増加 42 から 105',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Siege Shot 8 - ダメージ増加 47 から 125',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}),
																																							_1: {
																																								ctor: '::',
																																								_0: _elm_lang$html$Html$text('Long Shot は cast speed debuff を持つ。'),
																																								_1: {
																																									ctor: '::',
																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																										{
																																											ctor: '::',
																																											_0: 'Long Shot 1 - 3% cast speed debuff - 40秒間継続',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Long Shot 2 - 6% cast speed debuff - 40秒間継続',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Long Shot 3 - 9% cast speed debuff - 40秒間継続',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Long Shot 4 - 12% cast speed debuff - 40秒間継続',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Long Shot 5 - 15% cast speed debuff - 40秒間継続',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Long Shot 6 - 18% cast speed debuff - 40秒間継続',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Long Shot 7 - 21% cast speed debuff - 40秒間継続',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'Long Shot 8 - 24% cast speed debuff - 40秒間継続',
																																																		_1: {ctor: '[]'}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}),
																																									_1: {
																																										ctor: '::',
																																										_0: _elm_lang$html$Html$text('新しいスペル Track が追加される。再使用30秒。ステルス中のみ詠唱可能。'),
																																										_1: {
																																											ctor: '::',
																																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																												{
																																													ctor: '::',
																																													_0: 'Level 20 - 15% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 30 - 25% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 40 - 35% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 50 - 45% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}),
																																											_1: {
																																												ctor: '::',
																																												_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Celtic Dual (スペック)'),
																																												_1: {
																																													ctor: '::',
																																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																														{
																																															ctor: '::',
																																															_0: 'Level 15 - Thunderstorm - Detaunt anytime - Defensive bonus とダメージを他の detaunt スタイル並に減少',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 29 - Tempest - Ice Storm - ダメージやや増加',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Level 33 - Twin Star I - Tornado - ダメージ増加',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'Level 34 - Meteor Shower - Anytime - ダメージ減少',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: 'Level 39 - Solar Flare - Frozen Comet - -34% attack speed debuff effect, ダメージ増加',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: 'Level 50 - Supernova - Hurricane - ダメージかなり増加',
																																																				_1: {ctor: '[]'}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}),
																																													_1: {
																																														ctor: '::',
																																														_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blades (スペック)'),
																																														_1: {
																																															ctor: '::',
																																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																{
																																																	ctor: '::',
																																																	_0: 'Level 44 - Prismatic Blade - Anytime - ダメージ減少',
																																																	_1: {ctor: '[]'}
																																																}),
																																															_1: {
																																																ctor: '::',
																																																_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Piercing (スペック)'),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																		{
																																																			ctor: '::',
																																																			_0: 'Level 34 - Asp’s Bite - Anytime - ダメージ減少',
																																																			_1: {ctor: '[]'}
																																																		}),
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Ranger$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Ranger$patch_1_121, _Ragamuffine$daoc_patch_notes$Ranger$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Reaver$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('リーバー 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Circle of Despair は以下のように変更される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: '最大ターゲット数は 16 から 8 に変更。',
					_1: {
						ctor: '::',
						_0: 'ダメージを 5% から 25 に変更。',
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい instant DD shout のダメージタイプが Spirit から Cold に変更される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 1 - Soul Wench',
							_1: {
								ctor: '::',
								_0: 'Level 12 - Soul Rot',
								_1: {
									ctor: '::',
									_0: 'Level 18 - Soul Decay',
									_1: {
										ctor: '::',
										_0: 'Level 24 - Soul Toxin',
										_1: {
											ctor: '::',
											_0: 'Level 35 - Soul Venom',
											_1: {
												ctor: '::',
												_0: 'Level 49 - Soul Bane',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('energy resistance debuff が変更される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: '再使用タイマーが5秒から30秒に増加する。',
									_1: {
										ctor: '::',
										_0: 'Level 40 debuff Energy Void の効果は50%から40%に低下する。',
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Reaver$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('リーバー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('リーバーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Soulrending (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('instant DoT spell は除去される。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい single target DD スペルが追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 12 - Soul Rot - Instant cast - 15s 再使用 - 1000 range - 8 power - 28 spirit damage',
									_1: {
										ctor: '::',
										_0: 'Level 24 - Soul Toxin - Instant cast - 15s 再使用 - 1000 range - 16 power - 62 spirit damage',
										_1: {
											ctor: '::',
											_0: 'Level 35 - Soul Venom - Instant cast - 15s 再使用 - 1000 range - 21 power - 95 spirit damage',
											_1: {
												ctor: '::',
												_0: 'Level 49 - Soul Bane - Instant cast - 15s 再使用 - 1000 range - 30 power - 120 spirit damage',
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('lifetap proc は除去される。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい single target lifetap が追加される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 3 - Vigor Drain - Instant cast - 20s 再使用 - 1500 range - 3 power - 12 body damage 80% heal',
													_1: {
														ctor: '::',
														_0: 'Level 12 - Health Drain - Instant cast - 20s 再使用 - 1500 range - 8 power - 35 body damage 80% heal',
														_1: {
															ctor: '::',
															_0: 'Level 21 - Vitality Drain - Instant cast - 20s 再使用 - 1500 range - 13 power - 55 body damage 80% heal',
															_1: {
																ctor: '::',
																_0: 'Level 31 - Spirit Drain - Instant cast - 20s 再使用 - 1500 range - 23 power - 81 body damage 80% heal',
																_1: {
																	ctor: '::',
																	_0: 'Level 45 - Soul Drain - Instant cast - 20s 再使用 - 1500 range - 30 power - 109 body damage 80% heal',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('PBAoE damage pulse の半径は 400 に拡大される。'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('PBAoE damage pulse は同時に一つだけ使えるようになる。'),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$br,
															{ctor: '[]'},
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('pulsing PBAoE Melee DPS debuff は pulse ではなく単発になる。効果は 25 秒間継続する。再使用 30 秒。'),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$br,
																	{ctor: '[]'},
																	{ctor: '[]'}),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'レベル 8 の Crippling Curse はレベル 3 Arthritic Curse になる。効果は元のままである。',
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$br,
																			{ctor: '[]'},
																			{ctor: '[]'}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('レベル 41 の instant lifetap spell Life Siphon はレベル 42 になる。'),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$br,
																					{ctor: '[]'},
																					{ctor: '[]'}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しい PBAoE damage スペルが追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 41 - Circle of Despair - Instant cast - 90s 再使用 - 750 半径 - 15% power - 5% spirit damage',
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('新しい PBAoE pet scare スペルが追加される。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Level 39 - Malefic Horror - Instant cast - 再使用5分 - 350 半径 - 15秒間継続 - 5% power - 敵ペットを追い払う',
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('pulsing PBAoE melee ABS debuff は pulsing でなくなる。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Level 5 - Aura of Foreboding - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 2 power - 6% ABS debuff',
																												_1: {
																													ctor: '::',
																													_0: 'Level 14 - Aura of Destiny - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 6 power - 9% ABS debuff',
																													_1: {
																														ctor: '::',
																														_0: 'Level 25 - Aura of Fate - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 10 power - 11% ABS debuff',
																														_1: {
																															ctor: '::',
																															_0: 'Level 35 - Aura of Destiny - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 14 power - 15% ABS debuff',
																															_1: {
																																ctor: '::',
																																_0: 'Level 47 - Aura of the Inevitable - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 20 power - 20% ABS debuff',
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('acuity debuff は 30% power 回復するようになる。'),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$br,
																													{ctor: '[]'},
																													{ctor: '[]'}),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('新しい energy resistance debuff が追加される。'),
																													_1: {
																														ctor: '::',
																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																															{
																																ctor: '::',
																																_0: 'Level 20 - Energy Wither - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - energy resistance 15% debuff',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 30 - Energy Siphon - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - energy resistance 30% debuff',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 40 - Energy Wither - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - energy resistance 50% debuff',
																																		_1: {ctor: '[]'}
																																	}
																																}
																															}),
																														_1: {
																															ctor: '::',
																															_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Flexible (スペック)'),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																	{
																																		ctor: '::',
																																		_0: 'Level 29 - Taipan - Side - ダメージやや増加',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 34 - Constrictor - Anytime - ダメージ減少',
																																			_1: {
																																				ctor: '::',
																																				_0: 'Level 44 - Cobra - Taipan - ダメージやや増加',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 50 - Leviathan - Rear - ダメージかなり増加',
																																					_1: {ctor: '[]'}
																																				}
																																			}
																																		}
																																	}),
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Reaver$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Reaver$patch_1_121, _Ragamuffine$daoc_patch_notes$Reaver$patch_1_121B);

var _Ragamuffine$daoc_patch_notes$Runemaster$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ルーンマスター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ルーンマスターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Suppression (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('AoE root の射程は増加する。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 30 - 1655 range',
							_1: {
								ctor: '::',
								_0: 'Level 39 - 1765 range',
								_1: {
									ctor: '::',
									_0: 'Level 49 - 1875 range',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Level 26, 36, 46 の pulsing bladeturn は最上位のスペルのみスペルリストに載る。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Runecarving (スペック)'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しい single target energy DD が追加される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 6 - Mark of Thunder - 43 energy damage - 2.8s cast - 1500 range - 6 power',
											_1: {
												ctor: '::',
												_0: 'Level 16 - Insignia of Thunder - 86 energy damage - 2.8s cast - 1500 range - 12 power',
												_1: {
													ctor: '::',
													_0: 'Level 26 - Seal of Thunder - 133 energy damage - 2.8s cast - 1500 range - 17 power',
													_1: {
														ctor: '::',
														_0: 'Level 36 - Signet of Thunder - 163 energy damage - 2.8s cast - 1500 range - 22 power',
														_1: {
															ctor: '::',
															_0: 'Level 46 - Rune of Thunder - 209 energy damage - 2.8s cast - 1500 range - 29 power',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('いくつかのスペルのレベルが変更になる'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Mark of Ruin (GTAoE) は 19 からレベル 11 へ',
													_1: {
														ctor: '::',
														_0: 'Mark of Havoc (GTAoE) はレベル 26 から 21 へ',
														_1: {
															ctor: '::',
															_0: 'Mark of Devastation (GTAoE) は 36 から 31 へ',
															_1: {
																ctor: '::',
																_0: 'Mark of Undoing (GTAoE) は 43 から 41 へ',
																_1: {
																	ctor: '::',
																	_0: 'Moved Vex of Earth はレベル 46 から 44 へ',
																	_1: {
																		ctor: '::',
																		_0: 'Moved Odin\'s Hatred はレベル 44 から 43 へ',
																		_1: {
																			ctor: '::',
																			_0: 'Moved Lesser Sigil of Havoc (bolt) はレベル 6 から 8 へ',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Runemaster$all = _Ragamuffine$daoc_patch_notes$Runemaster$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Savage$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('サヴェジ 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('物理レジストバフはアイテムによる物理レジストとスタックするようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Savage$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('サヴェジ 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Savagery (スペック)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('すべての自己バフは有効期間が終わった時ではなく能力を使った時にヘルスコストが適用されるようになる。'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('自己ヘイストバフは全レベルで5%のヘルスコストとなる。'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$br,
							{ctor: '[]'},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('自己 parry バフは全レベルで5%のヘルスコストとなる。'),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$br,
									{ctor: '[]'},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('自己 evasion バフは全レベルで5%のヘルスコストとなる。このバフの有効期間内では Frenzy スタンスはもはや Einherjar weapon を proc しなくなる。'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('自己 melee ダメージ増加バフは全レベルで5%のヘルスコストとなる。このバフの有効期間内では Frenzy スタンスはもはや Einherjar weapon を proc しなくなる。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('物理レジストバフは3種類の物理レジストすべてを増加させる単一のバフになる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 6 - Deflect Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 5% 増加',
															_1: {
																ctor: '::',
																_0: 'Level 14 - Bear Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 9% 増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 23 - Withstand Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 13% 増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 31 - Endure Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 17% 増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 40 - Weather Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 21% 増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 47 - Ignore Attacks - Instant cast - 持続時間30秒 - 再使用5秒 - 10% health - crush, slash, thrust 25% 増加',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('新しいレジストを獲得するにはリスペックをする必要がある。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('Blissful Ignorance の再使用タイマーは5分から10分に増加する。'),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Savage$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('サヴェジ 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Savagery (スペック)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('endurance heal スペルは最上位のスペルのみ有効になる。'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$br,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('endurance heal バフのコストは増加する。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 20 - Kelgor\'s Gift - 5% から 10% health に増加',
								_1: {
									ctor: '::',
									_0: 'Level 29 - Kegor\'s Boon - 10% から 15% health に増加',
									_1: {
										ctor: '::',
										_0: 'Level 41 - Kelgor\'s Reward - 15% から 20% health に増加',
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('evasion 自己バフのコストは増加する。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 2 - Swiftness of Kelgor - 2% から 4% health に増加',
										_1: {
											ctor: '::',
											_0: 'Level 10 - Alacrity of Kelgor - 3% から 5% health に増加',
											_1: {
												ctor: '::',
												_0: 'Level 19 - Speed of Kelgor - 3% から 6% health に増加',
												_1: {
													ctor: '::',
													_0: 'Level 28 - Fleetness of Kelgor - 4% から 7% health に増加',
													_1: {
														ctor: '::',
														_0: 'Level 37 - Quickness of Kelgor - 4% から 8% health に増加',
														_1: {
															ctor: '::',
															_0: 'Level 45 - Evasion of Kelgor - 5% から 10% health に増加',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hand to Hand (スペック)'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 8 - Clan\'s Call - Rear - スタン時間を5秒から4秒に短縮',
												_1: {
													ctor: '::',
													_0: 'Level 18 - Clan\'s Might - Clan\'s Call - スネア除去',
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Savage$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('サヴェジ 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('サヴェジはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('サヴェジはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('サヴェジのレルムアビリティーからチャージがなくなる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('サヴェジはレベル上昇に伴ってチャージを習得する。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 30 - Charge 1',
								_1: {
									ctor: '::',
									_0: 'Level 35 - Charge 2',
									_1: {
										ctor: '::',
										_0: 'Level 40 - Charge 3',
										_1: {
											ctor: '::',
											_0: 'Level 45 - Charge 4',
											_1: {
												ctor: '::',
												_0: 'Level 50 - Charge 5',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Light Tank Stances'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$dl,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('uk-description-list-horizontal'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$dt,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('War Stance'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$dd,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$dt,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Wild Stance'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$dd,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。(これはサヴェジのダメージバフとスタックしない。サヴェジのダメージバフの方が効果が高い。)敵からの物理・魔法攻撃のダメージが 25% 上昇する。'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$dt,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Frenzy Stance'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$dd,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hand to Hand (スペック)'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 6 - Wild Call - Anytime - ダメージ減少',
													_1: {
														ctor: '::',
														_0: 'Level 8 - Clan\'s Call - Rear - 5秒スタン',
														_1: {
															ctor: '::',
															_0: 'Level 18 - Clan\'s Might - Clan\'s Call - 11秒 hinder',
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Axe (スペック)'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 15 - Evernight - Rear - スネア削除, ダメージやや増加',
															_1: {
																ctor: '::',
																_0: 'Level 29 - Havoc - Anytime - ダメージ減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 39 - Glacial Movement - Side - ダメージ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 44 - Arctic Rfit - Evernight - ダメージ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 50 - Tyr\'s Fury - Glacial Movement - ダメージやや増加',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hammer (スペック)'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 18 - Demolish - Frost Hammer - ダメージ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 29 - Conquer - Rear - スネア削除, ダメージやや増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 32 - Comminute - Anytime - ダメージ減少',
																			_1: {
																				ctor: '::',
																				_0: 'Level 44 - Sledgehammer - Conquer - ダメージ増加',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 15 - Aurora - Northern Lights - ダメージやや増加',
																			_1: {
																				ctor: '::',
																				_0: 'Level 29 - Rush - Side - 15秒 hinder',
																				_1: {
																					ctor: '::',
																					_0: 'Level 34 - Polar Rift - Anytime - ダメージ減少',
																					_1: {
																						ctor: '::',
																						_0: 'Level 50 - Ragnarok - Rear - スネア削除, ダメージ増加',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Savage$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Savage$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Savage$patch_1_121B,
		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Savage$patch_1_122B, _Ragamuffine$daoc_patch_notes$Savage$patch_1_122B_HotFix2)));

var _Ragamuffine$daoc_patch_notes$Scout$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカウト 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Realm Rank 5 アビリティーは再びチャージ中でないターゲットにスネアを与え、スカウト自身のスピードを増加させるようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Scout$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカウト 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('スカウトはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカウトはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('すべてのアーチャーは Remedy を得る。Remedy は再使用 5 分でもはや HP を失わない。毒に対する耐性を 60 秒間維持する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('すべてのアーチャーは Mastery of Stealth を獲得する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 10 - Mastery of Stealth 1',
									_1: {
										ctor: '::',
										_0: 'Level 15 - Mastery of Stealth 2',
										_1: {
											ctor: '::',
											_0: 'Level 20 - Mastery of Stealth 3',
											_1: {
												ctor: '::',
												_0: 'Level 25 - Mastery of Stealth 4',
												_1: {
													ctor: '::',
													_0: 'Level 30 - Mastery of Stealth 5',
													_1: {
														ctor: '::',
														_0: 'Level 35 - Mastery of Stealth 6',
														_1: {
															ctor: '::',
															_0: 'Level 40 - Mastery of Stealth 7',
															_1: {
																ctor: '::',
																_0: 'Level 45 - Mastery of Stealth 8',
																_1: {
																	ctor: '::',
																	_0: 'Level 50 - Mastery of Stealth 9',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Mastery of Stealth の移動速度への効果は減少する。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Mastery of Stealth 1 の移動速度は +10% のままである',
											_1: {
												ctor: '::',
												_0: 'Mastery of Stealth 2 の移動速度は +15% から +13% に減少する',
												_1: {
													ctor: '::',
													_0: 'Mastery of Stealth 3 の移動速度は +20% から +16% に減少する',
													_1: {
														ctor: '::',
														_0: 'Mastery of Stealth 4 の移動速度は +25% から +19% に減少する',
														_1: {
															ctor: '::',
															_0: 'Mastery of Stealth 5 の移動速度は +30% から +22% に減少する',
															_1: {
																ctor: '::',
																_0: 'Mastery of Stealth 6 の移動速度は +35% から +25% に減少する',
																_1: {
																	ctor: '::',
																	_0: 'Mastery of Stealth 7 の移動速度は +40% から +28% に減少する',
																	_1: {
																		ctor: '::',
																		_0: 'Mastery of Stealth 8 の移動速度は +45% から +31% に減少する',
																		_1: {
																			ctor: '::',
																			_0: 'Mastery of Stealth 9 の移動速度は +50% から +34% に減少する',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('50 stealth MOS9 を持つアーチャーはステルス中に通常速度の80%で移動する。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Archery (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('damage add スペルは削除される。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Critical Shot のダメージは増加する。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Critical Shot 1 のダメージは 12 から 15 へ増加',
																	_1: {
																		ctor: '::',
																		_0: 'Critical Shot 2 のダメージは 38 から 50 へ増加',
																		_1: {
																			ctor: '::',
																			_0: 'Critical Shot 3 のダメージは 79 から 90 へ増加',
																			_1: {
																				ctor: '::',
																				_0: 'Critical Shot 4 のダメージは 106 から 129 へ増加',
																				_1: {
																					ctor: '::',
																					_0: 'Critical Shot 5 のダメージは 132 から 168 へ増加',
																					_1: {
																						ctor: '::',
																						_0: 'Critical Shot 6 のダメージは 185 から 209 へ増加',
																						_1: {
																							ctor: '::',
																							_0: 'Critical Shot 7 のダメージは 212 から 248 へ増加',
																							_1: {
																								ctor: '::',
																								_0: 'Critical Shot 8 のダメージは 239 から 288 へ増加',
																								_1: {
																									ctor: '::',
																									_0: 'Critical Shot 9 のダメージは 265 から 308 へ増加',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('アーチャーの Critical Shot ペナルティーが -50% から -75% に増加する。'),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Standard Shot は 5 秒から 4.0 秒になる。'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Elemental Shot は 7 秒から 5.0 秒になる。ダメージタイプが以下のようになる。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Hunter: Benthic (cold), Tempestuous (spirit)',
																					_1: {
																						ctor: '::',
																						_0: 'Ranger: Pyroclasmic (heat), Entropic (energy)',
																						_1: {
																							ctor: '::',
																							_0: 'Scout: Lithic (matter), Somatic (body)',
																							_1: {ctor: '[]'}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('Power shot は 6 秒から 3.5 秒になり、dex により修正される。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$br,
																						{ctor: '[]'},
																						{ctor: '[]'}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Power shot のダメージは増加する。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Power Shot 1 のダメージは 12 から 15 へ増加',
																									_1: {
																										ctor: '::',
																										_0: 'Power Shot 2 のダメージは 38 から 50 へ増加',
																										_1: {
																											ctor: '::',
																											_0: 'Power Shot 3 のダメージは 79 から 90 へ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Power Shot 4 のダメージは 106 から 129 へ増加',
																												_1: {
																													ctor: '::',
																													_0: 'Power Shot 5 のダメージは 132 から 168 へ増加',
																													_1: {
																														ctor: '::',
																														_0: 'Power Shot 6 のダメージは 185 から 209 へ増加',
																														_1: {
																															ctor: '::',
																															_0: 'Power Shot 7 のダメージは 212 から 248 へ増加',
																															_1: {
																																ctor: '::',
																																_0: 'Power Shot 8 のダメージは 239 から 288 へ増加',
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Power Shot は bladeturn を貫通する。ブロックされない。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Power shot は再使用20秒となる。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Power shot はアーチャーのダメージペナルティーの対象となる。'),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('Rapid Fire shot は前方 90 度の cone AoE (FAE) となる。半径 700。'),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$br,
																													{ctor: '[]'},
																													{ctor: '[]'}),
																												_1: {
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('新しく root shot が追加される。再使用20秒。'),
																													_1: {
																														ctor: '::',
																														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																															{
																																ctor: '::',
																																_0: 'Level 18 - Bola Shot 1 - 12秒間 root - 4s cast - 2100 range',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 28 - Bola Shot 2 - 20秒間 root - 4s cast - 2100 range',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 38 - Bola Shot 3 - 28秒間 root - 4s cast - 2100 range',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 48 - Bola Shot 4 - 36秒間 root - 4s cast - 2100 range',
																																			_1: {ctor: '[]'}
																																		}
																																	}
																																}
																															}),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('新しく snare shot が追加される。'),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																	{
																																		ctor: '::',
																																		_0: 'Level 45 - Patella Shot - 15秒間 melee hinder - 15s 再使用 - 4s cast - 2100 range',
																																		_1: {ctor: '[]'}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('Point Blank Shot は以下のようになる。Point Blank Shot はブロックされない。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																			{
																																				ctor: '::',
																																				_0: 'Level 16 - Point Blank Shot 1 - 74 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 10秒ごと、同時に 14% haste buff',
																																				_1: {
																																					ctor: '::',
																																					_0: 'Level 26 - Point Blank Shot 2 - 134 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 8秒ごと、同時に 21% haste buff',
																																					_1: {
																																						ctor: '::',
																																						_0: 'Level 36 - Point Blank Shot 3 - 195 damage - 2s cast 妨害不可 - 90s 再使用 - 500 range - 自分を対象にした bladeturn 30 秒間, 6秒ごと、同時に 28% haste buff',
																																						_1: {ctor: '[]'}
																																					}
																																				}
																																			}),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('Poison shot は除去される。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('Acid shot は射程が 1500 に減少し 350 半径 AoE になる。'),
																																				_1: {
																																					ctor: '::',
																																					_0: A2(
																																						_elm_lang$html$Html$br,
																																						{ctor: '[]'},
																																						{ctor: '[]'}),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('Siege Shot はダメージが増加する。'),
																																						_1: {
																																							ctor: '::',
																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																								{
																																									ctor: '::',
																																									_0: 'Siege Shot 1 - ダメージ増加 2 から 7',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Seige Shot 2 - ダメージ増加 7 から 21',
																																										_1: {
																																											ctor: '::',
																																											_0: 'Siege Shot 3 - ダメージ増加 15 から 42',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Siege Shot 4 - ダメージ増加 21 から 60',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Siege Shot 5 - ダメージ増加 26 から 75',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Siege Shot 6 - ダメージ増加 37 から 90',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Siege Shot 7 - ダメージ増加 42 から 105',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Siege Shot 8 - ダメージ増加 47 から 125',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}),
																																							_1: {
																																								ctor: '::',
																																								_0: _elm_lang$html$Html$text('Long Shot は cast speed debuff を持つ。'),
																																								_1: {
																																									ctor: '::',
																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																										{
																																											ctor: '::',
																																											_0: 'Long Shot 1 - 3% cast speed debuff - 40秒間継続',
																																											_1: {
																																												ctor: '::',
																																												_0: 'Long Shot 2 - 6% cast speed debuff - 40秒間継続',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Long Shot 3 - 9% cast speed debuff - 40秒間継続',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Long Shot 4 - 12% cast speed debuff - 40秒間継続',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Long Shot 5 - 15% cast speed debuff - 40秒間継続',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Long Shot 6 - 18% cast speed debuff - 40秒間継続',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Long Shot 7 - 21% cast speed debuff - 40秒間継続',
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'Long Shot 8 - 24% cast speed debuff - 40秒間継続',
																																																		_1: {ctor: '[]'}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}),
																																									_1: {
																																										ctor: '::',
																																										_0: _elm_lang$html$Html$text('新しいスペル Track が追加される。再使用30秒。ステルス中のみ詠唱可能。'),
																																										_1: {
																																											ctor: '::',
																																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																												{
																																													ctor: '::',
																																													_0: 'Level 20 - 15% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Level 30 - 25% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Level 40 - 35% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Level 50 - 45% stealth detection bonus - 2s cast - 30秒間継続 - Focus スペルは移動または呪文の詠唱で無効化する - Self-target',
																																																_1: {ctor: '[]'}
																																															}
																																														}
																																													}
																																												}),
																																											_1: {ctor: '[]'}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Scout$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Scout$patch_1_121, _Ragamuffine$daoc_patch_notes$Scout$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャドウブレード 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シャドウブレードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Stealth (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レベル49 Vanish III は Vanish II に変更される。したがって再使用タイマーは15分になる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャドウブレード 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('RR5 Blooddrinking の回復量は60%から45%に低下する。持続時間は15s秒のまま。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャドウブレード 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シャドウブレードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャドウブレードはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('スペックポイントが 2.5 から 2.8 になる。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('レルムアビリティー Mastery of Magery を選択可能になる。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('RR5 Blooddrinking は次のように変更される。与えたダメージ の 20% の HP を回復するのではなく 60% になる。継続時間は 30 秒から 15 秒になる。'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Vanish はレルムアビリティーではなく Stealth スペックに含まれる。'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Mastery of Stealth はレルムアビリティーではなく Stealth スペックの Shadow Seek になる。'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('アサシンはレルムアビリティー Determination と Strike Prediction を選択可能になる。'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('アサシンから Heightened Awareness, Blood Rage, Subtlety アビリティーが除去される。'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('Remedy は再使用 5 分となり HP を失うことはなくなる。'),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$br,
													{ctor: '[]'},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('Viper の値が変更になる。'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 1 - 10% から 5%',
																_1: {
																	ctor: '::',
																	_0: 'Level 2 - 20% から 10%',
																	_1: {
																		ctor: '::',
																		_0: 'Level 3 - 35% から 20%',
																		_1: {
																			ctor: '::',
																			_0: 'Level 4 - 50% から 30%',
																			_1: {
																				ctor: '::',
																				_0: 'Level 5 - 75% から 40%',
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Stealth (スペック)'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しく Shadow Seek が追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 10 - Shadow Seek I - instant cast - 永久 - 5% 検知ボーナス',
																			_1: {
																				ctor: '::',
																				_0: 'Level 15 - Shadow Seek II - instant cast - 永久 - 10% 検知ボーナス',
																				_1: {
																					ctor: '::',
																					_0: 'Level 20 - Shadow Seek III - instant cast - 永久 - 15% 検知ボーナス',
																					_1: {
																						ctor: '::',
																						_0: 'Level 25 - Shadow Seek IV - instant cast - 永久 - 20% 検知ボーナス',
																						_1: {
																							ctor: '::',
																							_0: 'Level 30 - Shadow Seek V - instant cast - 永久 - 25% 検知ボーナス',
																							_1: {
																								ctor: '::',
																								_0: 'Level 35 - Shadow Seek VI - instant cast - 永久 - 30% 検知ボーナス',
																								_1: {
																									ctor: '::',
																									_0: 'Level 40 - Shadow Seek VII - instant cast - 永久 - 35% 検知ボーナス. 自動的に Shadow Seek I を得る。ステルス状態で通常移動速度の 70%',
																									_1: {
																										ctor: '::',
																										_0: 'Level 45 - Shadow Seek VIII - instant cast - 永久 - 40% 検知ボーナス. 自動的に Shadow Seek II を得る。ステルス状態で通常移動速度の 85%',
																										_1: {
																											ctor: '::',
																											_0: 'Level 50 - Shadow Seek IX - instant cast - 永久 - 45% 検知ボーナス. 自動的に Shadow Seek III を得る。ステルス状態で通常移動速度の 100%',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Detect Hidden と Assassinate アビリティーは除去される。'),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('Save Fall V はレベル 50 から 48 になる。'),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$br,
																					{ctor: '[]'},
																					{ctor: '[]'}),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しく Overshadow がレベル 49 に追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: '味方を一人ステルスにする - 10秒間継続 - 戦闘・非戦闘状態を問わず - Instant cast - 1000 range - 自分には不可 - 味方は移動できるが戦闘状態になるとステルスを失う',
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('Vanish レルムアビリティーが利用できる。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																									{
																										ctor: '::',
																										_0: 'Vanish 1 - 29 stealth - 再使用15分',
																										_1: {
																											ctor: '::',
																											_0: 'Vanish 2 - 39 stealth - 再使用15分',
																											_1: {
																												ctor: '::',
																												_0: 'Vanish 3 - 49 stealth - 再使用10分',
																												_1: {ctor: '[]'}
																											}
																										}
																									}),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('Vanish はステルスボーナスと引き換えに poison cure を行う。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Vanish の disarm 時間は silence と同じ15秒となる。'),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_elm_lang$html$Html$br,
																												{ctor: '[]'},
																												{ctor: '[]'}),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('Blur がレベル50 に追加される。'),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																														{
																															ctor: '::',
																															_0: 'ターゲットの場所に移動する - プレイヤーであること(敵味方は問わない) - 1000 range - 90s 再使用 - root/snare 状態でも可能だが CC は維持される - ステルスかどうかに関わらず使用可能 - 275 unit から 800 unit の距離のターゲットには使えない',
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('シャドウブレードは2つの固有な投擲能力を習得する。'),
																														_1: {
																															ctor: '::',
																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																{
																																	ctor: '::',
																																	_0: 'Level 46 - Decapitate - Front - Very High Damage - Very High Endurance - Very High To-Hit Bonus - Very High Defense Penalty - 500 range - 10s disarm - poison proc buff 状態なら poison を proc する',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 48 - Tomahawk - Stealth - High Damage - Very High Endurance - Low To-Hit Penalty - Very High Defensive Bonus - 1000 range - 10s disarm - poison proc buff 状態なら poison を proc する',
																																		_1: {ctor: '[]'}
																																	}
																																}),
																															_1: {
																																ctor: '::',
																																_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Envenom (スペック)'),
																																_1: {
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('毒は武器に適用するアイテムではなくなった。'),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('毒は Envenom スペックで習得する offensive proc buff である。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('この offensive proc は 100% 発動しレジストできない。'),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('この offensive proc buff はステルス中でも詠唱可能でステルス状態を維持する。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _elm_lang$html$Html$text('poison proc buff を持った状態で2つの武器を使用しても発動するのは一度だけである。'),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('ただし別のターゲットに対して毒を適用することはできる。'),
																																						_1: {
																																							ctor: '::',
																																							_0: _elm_lang$html$Html$text('同一ターゲットに二重に毒を適用することはできない。'),
																																							_1: {
																																								ctor: '::',
																																								_0: A2(
																																									_elm_lang$html$Html$br,
																																									{ctor: '[]'},
																																									{ctor: '[]'}),
																																								_1: {
																																									ctor: '::',
																																									_0: _elm_lang$html$Html$text('poison proc buff には以下の 6 種類ある。'),
																																									_1: {
																																										ctor: '::',
																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																											{
																																												ctor: '::',
																																												_0: 'Effectiveness poison: melee dps + attack speed debuff',
																																												_1: {
																																													ctor: '::',
																																													_0: 'Withering poison: disease + melee resistance debuff',
																																													_1: {
																																														ctor: '::',
																																														_0: 'Stat debuff poison: weapon skill + all stats debuff',
																																														_1: {
																																															ctor: '::',
																																															_0: 'Damaging poison: DoT',
																																															_1: {
																																																ctor: '::',
																																																_0: 'Shadowbind poison: snare',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'Tranquilizing poison: mesmerization',
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}),
																																										_1: {
																																											ctor: '::',
																																											_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing 以外の毒の再使用タイマーは 8 秒である。'),
																																											_1: {
																																												ctor: '::',
																																												_0: _elm_lang$html$Html$text('Shadowbind と Tranquilizing は独立したタイマーを持ち、それぞれ 8 秒と 25 秒である。'),
																																												_1: {
																																													ctor: '::',
																																													_0: _elm_lang$html$Html$text('mezz poison は Spymaster から除去される。'),
																																													_1: {
																																														ctor: '::',
																																														_0: A2(
																																															_elm_lang$html$Html$br,
																																															{ctor: '[]'},
																																															{ctor: '[]'}),
																																														_1: {
																																															ctor: '::',
																																															_0: _elm_lang$html$Html$text('Effectiveness Poison: ターゲットの物理攻撃ダメージと攻撃スピードの debuff. 20 秒継続。'),
																																															_1: {
																																																ctor: '::',
																																																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																	{
																																																		ctor: '::',
																																																		_0: '3 Envenom - Minor Essence of Lethargy. melee damage 4% attack speed 5%.',
																																																		_1: {
																																																			ctor: '::',
																																																			_0: '13 Envenom - Weak Essence of Lethargy. melee damage 6% attack speed 10%.',
																																																			_1: {
																																																				ctor: '::',
																																																				_0: '23 Envenom - Essence of Lethargy. melee damage 10% attack speed 15%.',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '33 Envenom - Major Essence of Lethargy. melee damage 15% attack speed 20%.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '43 Envenom - Swordbreaker. melee damage 20% attack speed by 25%.',
																																																						_1: {ctor: '[]'}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}),
																																																_1: {
																																																	ctor: '::',
																																																	_0: _elm_lang$html$Html$text('Withering Poison: disease. 15 秒継続。'),
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																			{
																																																				ctor: '::',
																																																				_0: '4 Envenom - Minor Widow Sting. Diseased, 15% slow strength 5',
																																																				_1: {
																																																					ctor: '::',
																																																					_0: '16 Envenom - Widow Sting. Diseased, 15% slow strength 10.',
																																																					_1: {
																																																						ctor: '::',
																																																						_0: '26 Envenom - Widow Toxin. Diseased, 15% slow, strength 15, melee resistance 5%.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '36 Envenom - Widow Toxin. Diseased, 15% slow, strength 20, melee resistance 10%.',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '46 Envenom - Widow Venom. Diseased, 15% slow, strength 25, melee resistance 20%.',
																																																								_1: {ctor: '[]'}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}),
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _elm_lang$html$Html$text('Stat debuff Poison: Weaponskill, Dexterity, Strength, Constitution debuff. 30 秒間継続。'),
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																					{
																																																						ctor: '::',
																																																						_0: '7 Envenom - Weakening Poison. WS 5%, stat 13.',
																																																						_1: {
																																																							ctor: '::',
																																																							_0: '17 Envenom - Inhibiting Poison. WS 8%, stat 24.',
																																																							_1: {
																																																								ctor: '::',
																																																								_0: '27 Envenom - Enervating Poison. WS 10%, stat 30.',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '37 Envenom - Unnerving Poison. WS 14%, stat 41.',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: '47 Envenom - Touch of Death. WS 19%, stat 60.',
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}),
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _elm_lang$html$Html$text('Snare Poison: snare poison には root/snare タイマーが適用されない。再使用すると上書きされる。'),
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																							{
																																																								ctor: '::',
																																																								_0: '9 Envenom - Crippling Toxin. Snare 15%, 4 秒間',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: '29 Envenom - Snaring Toxin. Snare 35%, 6 秒間',
																																																									_1: {
																																																										ctor: '::',
																																																										_0: '49 Envenom - Shadowbind. Snare 60%, 9 秒間',
																																																										_1: {ctor: '[]'}
																																																									}
																																																								}
																																																							}),
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _elm_lang$html$Html$text('Mez Poison: この poison は bodyguard を妨害できる。半径 500 内のすべてのターゲットに有効で mezz 時間短縮バフの影響を受けない。'),
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																									{
																																																										ctor: '::',
																																																										_0: '18 Envenom - Tranquilizing Gas - 5秒間継続 PBAoE mez.',
																																																										_1: {
																																																											ctor: '::',
																																																											_0: '46 Envenom - Tranquilizing Miasma - 15秒間継続 PBAoE mez.',
																																																											_1: {ctor: '[]'}
																																																										}
																																																									}),
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _elm_lang$html$Html$text('Damage-over-Time Poison: 20 秒間継続。'),
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																											{
																																																												ctor: '::',
																																																												_0: '1 Envenom - Minor Lethal Poison. 9 body damage, 3.9 秒ごと',
																																																												_1: {
																																																													ctor: '::',
																																																													_0: '5 Envenom - Lesser Lethal Poison. 15 body damage every 3.9 seconds.',
																																																													_1: {
																																																														ctor: '::',
																																																														_0: '10 Envenom - Lethal Poison. 22 body damage every 3.9 seconds.',
																																																														_1: {
																																																															ctor: '::',
																																																															_0: '15 Envenom - Major Lethal Poison. 29 body damage 3.9 seconds.',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: '20 Envenom - Greater Lethal Poison. 36 body damage 3.9 seconds.',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: '25 Envenom - Minor Lethal Venom. 36 body damage, 22 matter damage, 3.9 秒ごと',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: '30 Envenom - Lesser Lethal Venom. 38 body damage, 30 matter damage, 3.9 秒ごと',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: '35 Envenom - Major Lethal Venom. 42 body damage, 39 matter damage, 3.9 秒ごと',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: '40 Envenom - Greater Lethal Venom. 50 body damage, 46 matter damage, 3.9 秒ごと',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: '45 Envenom - Insidious Lethal Venom. 72 body damage, 55 matter damage, 3.9 秒ごと',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: '50 Envenom - Lifebane. 101 body damage, 60 matter damage, 3.9 秒ごと',
																																																																						_1: {ctor: '[]'}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}),
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Critical Strike (スペック)'),
																																																											_1: {
																																																												ctor: '::',
																																																												_0: _elm_lang$html$Html$text('Armor Wither はレジスト不可になる。'),
																																																												_1: {
																																																													ctor: '::',
																																																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																														{
																																																															ctor: '::',
																																																															_0: 'Level 8 - Pincer - Side - 4s melee stun',
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'Level 10 - Backstab 2 - Rear - ダメージやや増加',
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'Level 12 - Hamstring - Evade - 20% attack speed debuff, ダメージやや増加',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 18 - Garrote - Anytime - 14 damage bleed, ダメージ減少',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 21 - Perforate Artery - Frontal stealth - ダメージかなり増加, 10秒間継続 armor wither',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 25 - Achilles Heel - rear - 10秒間継続 armor wither, ダメージ増加',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 29 - Leaper - Pincer - 1% ABS debuff, ダメージやや増加',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 39 - Stunning Stab - Creeping Death - 3% ABS debuff',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 44 - Rib Separation - Achilles Heel - 7s melee stun, ダメージかなり増加',
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'Level 45 - Incapacitate style は除去される。',
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'Level 46 - Neck Shot - anytime - ダメージやや軽減, helm armor slot',
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'Level 47 - Rib Shot - anytime - ダメージやや軽減, chest armor slot',
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: 'Level 48 - Hip Shot - anytime - ダメージやや軽減, leggings armor slot',
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: 'Level 50 - Ripper - Garrote - 20秒間継続 armor wither, ダメージやや増加',
																																																																												_1: {ctor: '[]'}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}),
																																																													_1: {
																																																														ctor: '::',
																																																														_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Left Axe (スペック)'),
																																																														_1: {
																																																															ctor: '::',
																																																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																{
																																																																	ctor: '::',
																																																																	_0: 'Level 12 - Atrophy - Ravager - hinder 21%, 20秒 attack speed debuff',
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'Level 21 - Scathing Blade - Doubler - 12秒 hinder',
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'Level 29 - Snowsquall - Level 39 に移動 - Rear - スネア削除, ダメージ増加',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 39 - Frosty Gaze - Level 29 に移動 - Comeback - ダメージやや減少, スタン7秒',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 34 - Doublefrost - Anytime - ダメージ減少',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 44 - Icy Brilliance - Snowsquall - ダメージやや減少',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 50 - Aurora Borealis - Decaying Rage - ダメージやや減少',
																																																																							_1: {ctor: '[]'}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}),
																																																															_1: {
																																																																ctor: '::',
																																																																_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Axe (スペック)'),
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																		{
																																																																			ctor: '::',
																																																																			_0: 'Level 15 - Evernight - Rear - スネア削除, ダメージやや増加',
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'Level 29 - Havoc - Anytime - ダメージ減少',
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'Level 39 - Glacial Movement - Side - ダメージ増加',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 44 - Arctic Rift - Evernight - ダメージ増加',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 50 - Tyr’s Fury - Glacial Movement - ダメージやや増加',
																																																																							_1: {ctor: '[]'}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}),
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																																																				{
																																																																					ctor: '::',
																																																																					_0: 'Level 15 - Aurora - Northern Lights - ダメージやや増加',
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'Level 34 - Polar Rift - Anytime - ダメージ減少',
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'Level 50 - Ragnarok - Rear - スネア削除, ダメージ増加',
																																																																							_1: {ctor: '[]'}
																																																																						}
																																																																					}
																																																																				}),
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Shadowblade$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121B, _Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Shaman$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャーマン 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Augmentation (基本)'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: 'Level 42 - Guardian\'s Lesser Protection - AF の増加量が 52 から 150 になる。',
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Augmentation (スペック)'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 30 - Earthen Power の物理ダメージ増加量が15%から35%になる。',
							_1: {
								ctor: '::',
								_0: 'Level 36 - Caustic Carapace のダメージ反射が150%から200%に上昇する。',
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Shaman$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャーマン 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シャーマンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Level 28 single target acuity shear Acuity Cut は Augmentation スペックに戻される。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Shaman$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('シャーマン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シャーマンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('シャーマンの RR5 Restorative Mend は次のように変更される。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('ティックごとの Health, End, Power の回復は 5% から 15% になる。持続時間は45秒から20秒になる。ティックは3秒ごとではなく2秒ごとになる。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Mending (基本)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Augmentation (スペック)'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('新しい single target comprehension buff が追加される。この buff は acuity buff とスタックする。'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 23 - Tribal Clarity - 2.5s cast - 1500 range - 再使用60秒 - 20秒間継続 - 25% power - piety 30 増加',
												_1: {
													ctor: '::',
													_0: 'Level 43 - Ancestral Clarity - 2.5s cast - 1500 range - 再使用60秒 - 20秒間継続 - 25% power - piety 62 増加',
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('新しい single target melee damage increase buff が追加される。'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Level 30 - Earthen Power - 3.2s cast - 1500 range - 再使用30秒 - 10秒間継続 - 20% power - 物理ダメージを15%増加',
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('新しい single target melee damage 反射 buff が追加される'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 36 - Caustic Carapace - 3.0s cast - 1500 range - 再使用60秒 - 15秒間継続 - 20% power - 物理ダメージを150%反射する',
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('Spirit Shell はフォーカスではなくバフになる。ターゲットは戦闘可能。詠唱 2.5 秒, 持続時間 10 秒, 再使用60秒, 25% power.'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しいヒール増強バフが追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 24 - Frigg\'s Grace - 2s cast - 1500 range - 再使用15秒 - 45秒間継続 - 20% power - ターゲットへのヒールを55%増加させる',
																			_1: {
																				ctor: '::',
																				_0: 'Level 35 - Frigg\'s Superior Grace - 2s cast - 1500 range - 再使用15秒 - 45秒間継続 - 20% power - ターゲットへのヒールを100%増加させる。',
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい heal over time が追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 8 - Regenerative Stupor - Instant cast - 1500 range - 持続時間10秒 - 5% power - 毎秒12 HP回復 - 再使用30秒',
																					_1: {
																						ctor: '::',
																						_0: 'Level 18 - Regenerative Dream - Instant cast - 1500 range - 持続時間10秒 - 10% power - 毎秒25 HP回復 - 再使用30秒',
																						_1: {
																							ctor: '::',
																							_0: 'Level 28 - Regenerative Muse - Instant cast - 1500 range - 持続時間10秒 - 20% power - 毎秒50 HP回復 - 再使用30秒',
																							_1: {
																								ctor: '::',
																								_0: 'Level 38 - Regenerative Trance - Instant cast - 1500 range - 持続時間10秒 - 30% power - 毎秒100 HP回復 - 再使用30秒',
																								_1: {
																									ctor: '::',
																									_0: 'Level 48 - Regenerative Rapture - Instant cast - 1500 range - 持続時間10秒 - 40% power - 毎秒150 HP回復 - 再使用30秒',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff とスタックしない。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 13 - Cavern Unity - Increases Heat/Matter/Cold resist 12%増加',
																							_1: {
																								ctor: '::',
																								_0: 'Level 30 - Tribal Unity - Increases Heat/Matter/Cold resist 18%増加',
																								_1: {
																									ctor: '::',
																									_0: 'Level 40 - Shaman Unity - Increases Heat/Matter/Cold resist 24%増加',
																									_1: {ctor: '[]'}
																								}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Cave Magic (基本)'),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('disease と AOE disease は最上位のレベルのみ有効になる。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Cave Magic (スペック)'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('ダメージシールドは Cave Magic に移動する。concentration buff ではなく持続時間10分になる。'),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('matter DD スペルは調整される。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																												{
																													ctor: '::',
																													_0: 'Level 1 - Fungal Mud - 5 ダメージから 17 ダメージに増加',
																													_1: {
																														ctor: '::',
																														_0: 'Level 11 - Fungal Slush - 41 ダメージから 57 ダメージに増加',
																														_1: {
																															ctor: '::',
																															_0: 'Level 21 - Fungal Ooze -  73 ダメージから 92 ダメージに増加',
																															_1: {
																																ctor: '::',
																																_0: 'Level 31 - Fungal Ichor - 108 ダメージから 128 ダメージに増加',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 41 - Fungal Mucus - 148 ダメージから 179 ダメージに増加',
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('ボルトスペルは調整される。'),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																														{
																															ctor: '::',
																															_0: 'Level 1 - Fungal Pin - 8 ダメージから 26 ダメージに増加',
																															_1: {
																																ctor: '::',
																																_0: 'Level 11 - Fungal Bramble - 64 ダメージから 103 ダメージに増加',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 21 - Fungal Thorn - 145 ダメージから 170 ダメージに増加',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 31 - Fungal Barb - 169 ダメージから 211 ダメージに増加',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 41 - Fungal Spine - 232 ダメージから 265 ダメージに増加',
																																			_1: {ctor: '[]'}
																																		}
																																	}
																																}
																															}
																														}),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('新しく root 除去スペルが追加される。'),
																														_1: {
																															ctor: '::',
																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																{
																																	ctor: '::',
																																	_0: 'Level 16 - Escape Hold - 3s cast - 1500 range - 再使用5分 - 10% power - すべての root/snare を除去する。自分には使用できない。',
																																	_1: {ctor: '[]'}
																																}),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('新しい single target root が追加される。'),
																																_1: {
																																	ctor: '::',
																																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																		{
																																			ctor: '::',
																																			_0: 'Level 28 - Rotting Clench - Instant cast - 1500 range - 5min 再使用 - 46秒間継続',
																																			_1: {ctor: '[]'}
																																		}),
																																	_1: {
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('新しい AoE root が追加される。'),
																																		_1: {
																																			ctor: '::',
																																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																				{
																																					ctor: '::',
																																					_0: 'Level 38 - Rotting Undergrowth - Instant cast - 1500 range - 350 半径 - 10min 再使用 - 56秒間継続',
																																					_1: {ctor: '[]'}
																																				}),
																																			_1: {
																																				ctor: '::',
																																				_0: _elm_lang$html$Html$text('新しい物理ダメージ吸収バフが追加される。'),
																																				_1: {
																																					ctor: '::',
																																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																						{
																																							ctor: '::',
																																							_0: 'Level 21 - Crumble Arms - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 10% power - ターゲットへの物理ダメージを20%吸収.',
																																							_1: {
																																								ctor: '::',
																																								_0: 'Level 41 - Deteriorate Arms - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 20% power - ターゲットへの物理ダメージを40%吸収.',
																																								_1: {ctor: '[]'}
																																							}
																																						}),
																																					_1: {
																																						ctor: '::',
																																						_0: _elm_lang$html$Html$text('新しい魔法ダメージ吸収バフが追加される。'),
																																						_1: {
																																							ctor: '::',
																																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																								{
																																									ctor: '::',
																																									_0: 'Level 24 - Suppress Magic - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 15% power - ターゲットへの魔法ダメージを25%吸収.',
																																									_1: {
																																										ctor: '::',
																																										_0: 'Level 44 - Halt Magic - 2.8 sec cast - 1000 range - 持続時間30秒 - 30% power - 再使用45秒 - ターゲットへの魔法ダメージを50%吸収.',
																																										_1: {ctor: '[]'}
																																									}
																																								}),
																																							_1: {
																																								ctor: '::',
																																								_0: _elm_lang$html$Html$text('新しい PBAoE endurance デバフスペルが追加される。'),
																																								_1: {
																																									ctor: '::',
																																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																										{
																																											ctor: '::',
																																											_0: 'Level 30 - Exhaustive Blast - Instant - 半径750 - 再使用15秒 - 102 power - ターゲットの endurance を 35 低下させる',
																																											_1: {ctor: '[]'}
																																										}),
																																									_1: {ctor: '[]'}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Shaman$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Shaman$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Shaman$patch_1_121B, _Ragamuffine$daoc_patch_notes$Shaman$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Skald$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカルド 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('シージチャントは正しくグループメンバーに効果を及ぼすようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Skald$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカルド 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('スカルドはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Battlesongs (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しく siege ダメージ吸収オーラが追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 6 - Rhythm of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 10% 低減',
							_1: {
								ctor: '::',
								_0: 'Level 16 - Accent of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 20% 低減',
								_1: {
									ctor: '::',
									_0: 'Level 26 - Intonation of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 30% 低減',
									_1: {
										ctor: '::',
										_0: 'Level 36 - Pulse of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 40% 低減',
										_1: {
											ctor: '::',
											_0: 'Level 46 - Count of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 50% 低減。同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しく siege へのグループダメージボーナスが追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。',
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Skald$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカルド 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('スカルドはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('スカルドはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レルムアビリティー Determination を選択可能になる。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Battlesongs (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('自己バフ Root Dampening は除去される。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('resist song は30分継続のバフになる。CL resist およびシャーマン、ヒーラーのレジストとスタックしない。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 27 - Soul Bolstering Chant - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 8% 増加',
											_1: {
												ctor: '::',
												_0: 'Level 46 - Soul Bolstering Song - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 12% 増加',
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('新しい speed buff を追加'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Crescendo, realm target, instant-cast, 再使用45秒, 7秒間継続, 130% speed buff, レベル35. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
													_1: {
														ctor: '::',
														_0: 'Great Crescendo, realm target, instant-cast, 再使用45秒, 9秒間継続, 160% speed buff, レベル44. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
														_1: {
															ctor: '::',
															_0: 'March of Bragi, group target, instant-cast, 再使用10分, 9秒間継続, 160% speed buff, レベル50. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。',
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('group fatigue reduction buff は pulse に戻る。'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('Moved Epiphany はレベル49になる。'),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$br,
															{ctor: '[]'},
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しい PBAoE confuse spell が追加される。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 27 - Disorienting Yelp - 20秒間継続 - 90s 再使用 - 500 半径 - 10% power cost',
																		_1: {
																			ctor: '::',
																			_0: 'Level 47 - Disorienting Cry - 20秒間継続 - 90s 再使用 - 750 半径 - 10% power cost',
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('新しいスペル Sleep and Stun Guard が追加される。'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																			{
																				ctor: '::',
																				_0: 'Level 38 - Sleep Guard - Instant cast - realm-targeted - mezz を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない',
																				_1: {
																					ctor: '::',
																					_0: 'Level 48 - Stun Guard - Instant cast - realm-targeted - スタン(呪文)を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない',
																					_1: {ctor: '[]'}
																				}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('single-target DD は power pool の30%を回復するようになる。'),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('speed song がランダムに落ちることがなくなる。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Axe (スペック)'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 15 - Evernight - Rear - ダメージ増加',
																								_1: {
																									ctor: '::',
																									_0: 'Level 29 - Havoc - Anytime - ダメージ減少',
																									_1: {
																										ctor: '::',
																										_0: 'Level 39 - Glacial Movement - Side - ダメージ増加',
																										_1: {
																											ctor: '::',
																											_0: 'Level 44 - Arctic Rfit - Evernight - ダメージ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Level 50 - Tyr\'s Fury - Glacial Movement - ダメージやや増加',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hammer (スペック)'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'Level 18 - Demolish - Frost Hammer - ダメージ増加',
																											_1: {
																												ctor: '::',
																												_0: 'Level 29 - Conquer - Rear - ダメージ増加',
																												_1: {
																													ctor: '::',
																													_0: 'Level 32 - Comminute - Anytime - ダメージ減少',
																													_1: {
																														ctor: '::',
																														_0: 'Level 44 - Sledgehammer - Conquer - ダメージ増加',
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Level 15 - Aurora - Northern Lights - ダメージやや増加',
																												_1: {
																													ctor: '::',
																													_0: 'Level 34 - Polar Rift - Anytime - ダメージ減少',
																													_1: {
																														ctor: '::',
																														_0: 'Level 50 - Ragnarok - Rear - ダメージ増加',
																														_1: {ctor: '[]'}
																													}
																												}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Skald$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Skald$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Skald$patch_1_122B, _Ragamuffine$daoc_patch_notes$Skald$patch_1_122B_HotFix2));

var _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ソーサラー 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Mind Magic baseline'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('グループスピード呪文の効果はミンストレルと同じレベルまで強化される。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
					{
						ctor: '::',
						_0: 'Level 6 - Amplify Movement - 126% から 144% に',
						_1: {
							ctor: '::',
							_0: 'Level 16 - Amplify Running - 133% から 156% に',
							_1: {
								ctor: '::',
								_0: 'Level 26 - Amplify Coordination - 141% から 174% に',
								_1: {
									ctor: '::',
									_0: 'Level 36 - Amplify Equilibrium - 148% から 189% に',
									_1: {
										ctor: '::',
										_0: 'Level 46 - Amplify Balance - 176% から 204% に',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('新しくグループ waterbreath 呪文が追加される。'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 14 - Minor Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 10 power - 水中で地上の 70% の速度で移動する',
								_1: {
									ctor: '::',
									_0: 'Level 24 - Lesser Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 15 power - 水中で地上の 80% の速度で移動する',
									_1: {
										ctor: '::',
										_0: 'Level 34 - Greater Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 20 power - 水中で地上の 90% の速度で移動する',
										_1: {
											ctor: '::',
											_0: 'Level 44 - Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 25 power - 水中で地上の 100% の速度で移動する',
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ソーサラー 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Mind Magic (スペック)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('以下の変化を反映するためにはリスペックが必要になる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('いくつかのスペルのレベルが変更される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 26 to 21 - Perspicuity of Power - Single-target power regen buff',
							_1: {
								ctor: '::',
								_0: 'Level 27 to 22 - Circle of Perspicuity - Group power regen buff',
								_1: {
									ctor: '::',
									_0: 'Level 36 to 30 - Cognition of Power - Single-target power regen buff',
									_1: {
										ctor: '::',
										_0: 'Level 37 to 31 - Circle of Cognition - Group power regen buff',
										_1: {
											ctor: '::',
											_0: 'Level 46 to 41 - Lucidity of Power - Single-target power regen buff',
											_1: {
												ctor: '::',
												_0: 'Level 47 to 42 - Circle of Lucidity - Group power regen buff',
												_1: {
													ctor: '::',
													_0: 'Level 49 to 46 - Brotherhood of the Mind - Mez-dampening chant',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('以下の新しいスペルが追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 45 - Suggested Rage - 3.2s cast - 物理ダメージ10%増加バフ - group-targeted - 持続時間10秒 - 再使用30秒 - 20% base power - 半径1500',
									_1: {
										ctor: '::',
										_0: 'Level 47 - Impenetrable Shield - 詠唱時間10秒(移動中でも可) - 自分に対して20分持続する AF, spec AF, ABS buff, 魔法ダメージデバフを行う。(既存のバフを上書きする。250 base AF, 275 spec AF, 30% absorb, 自分が行う魔法攻撃ダメージを40%低下。AF, spec AF, absorb バフは解除可能。一つ解除するとすべて失う。魔法ダメージデバフは解除不可能。)',
										_1: {
											ctor: '::',
											_0: 'Level 48 - Forced Trance - instant-cast - mesmerize - single-targeted - 持続時間30秒 - 再使用600秒 - 18 power - 1500 range',
											_1: {
												ctor: '::',
												_0: 'Level 49 - Mollifying Suggestion - 2.8s cast - ターゲットの魔法攻撃ダメージを30%低下させる - single-targeted - 持続時間30秒 - 再使用60秒 - 1500 range - 30% base power',
												_1: {
													ctor: '::',
													_0: 'Level 50 - Mindfulness - instant-cast - quickcast タイマーをリセットする - self-targeted - 再使用60秒',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ソーサラー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ソーサラーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Matter Magic (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しいDDスペルを追加'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power',
							_1: {
								ctor: '::',
								_0: 'Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power',
								_1: {
									ctor: '::',
									_0: 'Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power',
									_1: {
										ctor: '::',
										_0: 'Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power',
										_1: {
											ctor: '::',
											_0: 'Level 45 - Magma Crush - 2.6s - 179 matter damage - 1500 range - 30 power',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Body Disorientation (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('AoE root の射程は延長される。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 30 - 1655 range',
										_1: {
											ctor: '::',
											_0: 'Level 39 - 1765 range',
											_1: {
												ctor: '::',
												_0: 'Level 49 - 1875 range',
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Mind Magic (スペック)'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Mez Dampening 自己 buff は除去される。',
												_1: {
													ctor: '::',
													_0: 'Added group-wide power regen buffs of versions that did not have them.',
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Sorcerer$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121C, _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix4 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スピリットマスター 1.122B Hot Fix #4'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Spirit Valkyrie ペットの移動速度がやや低下する。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スピリットマスター 1.122B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('spirit valkyrie ペットの物理防御は減少する。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix2 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スピリットマスター 1.122B Hot Fix #2'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スピリットマスター 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('スピリットマスターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Darkness (スペック)'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
					{
						ctor: '::',
						_0: 'Level 47 - Distinguish Lifeforce のダメージは 179 から 199 に増加する。',
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Summoning (基本)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('ペットのレベルは詠唱者のレベルと等しくなる。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しいペットが追加される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 1 - Spirit Warrior - 詠唱6秒 - 40% power - このペットはタンクであり耐久性があるが速度は遅い。マスターの近くにいればマスターへの物理攻撃を 75% の確率でインターセプトする。背後からスタン、側面から Mangle, 正面から Plague でタウントを行う。魔法によるスタン、メツ、ルートの持続時間は 65% 短縮される。',
											_1: {
												ctor: '::',
												_0: 'Level 11 - Spirit Hunter - 詠唱6秒 - 40% power - このペットは遠距離物理攻撃に特化している。弓で高ダメージを与える。弓の proc で小さな魔法ダメージを与える。このペットは spirit avatar を引き連れている。spirit avatar はマスターの 88% のレベルである。Spirit Hunter を妨害することはできない。',
												_1: {
													ctor: '::',
													_0: 'Level 21 - Spirit Runemaster - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。1500レンジの cold デバフ DD と近視で攻撃を行う。このペットを妨害することはできない。',
													_1: {
														ctor: '::',
														_0: 'Level 31 - Spirit Shaman - 詠唱6秒 - 40% power - 単体ルート、半径200の AoE 病気を詠唱する。味方をヒールするが攻撃を優先するのでヒールだけ行わせるには passive にする必要がある。このペットを物理攻撃すると病気になる。このペットを妨害することはできない。',
														_1: {
															ctor: '::',
															_0: 'Level 41 - Spirit Valkyrie - 詠唱6秒 - 40% power - このペットは物理防御に特化している。Roundhouse スタイルチェーンを使う。Dex/Qui shear を行う。インスタント DD でターゲットを攻撃する。体力が低下すると PBAoE ヒールを行う。passive 状態にすると継続してヒールを行い、これを妨害することはできない。被ダメージがやや緩和されている。',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('単体ペットヒールは以下のように調整される。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 3 - Recover Spirit - 詠唱3秒 - 2000 range - 4 power - 46回復',
													_1: {
														ctor: '::',
														_0: 'Level 13 - Reconstitute Spirit - 詠唱3秒 - 2000 range - 4 power - 81回復',
														_1: {
															ctor: '::',
															_0: 'Level 23 - Rejuvenate Spirit - 詠唱3秒 - 2000 range - 4 power - 146回復',
															_1: {
																ctor: '::',
																_0: 'Level 33 - Restore Spirit - 詠唱3秒 - 2000 range - 4 power - 201回復',
																_1: {
																	ctor: '::',
																	_0: 'Level 43 - Regenerate Spirit - 詠唱3秒 - 2000 range - 4 power - 300回復',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('グループAF増強バフが追加された。このバフはベースAF、スペックAFと重複する。バフボーナスと Summoning スキルに影響される。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 7 - Shield of the Spirit - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 5増加',
															_1: {
																ctor: '::',
																_0: 'Level 17 - Shield of the Jotun - 詠唱5秒 - 1500 range - 10% power - 10増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 27 - Shield of the Viking -詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 15増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 37 - Shield of the North - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 20増加',
																		_1: {
																			ctor: '::',
																			_0: 'Level 47 - Shield of the Einherjar - 詠唱5秒 - 1500 range - 持続時間10分 - 10% power - 25増加',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('単体ペット demezz 呪文 Awaken Spirit はレベル25に移動された。'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Summoning (スペック)'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('蘇生呪文は以下のように調整される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 20 - Restore Spirit - 詠唱4秒 - 1500 range - 25% power - 10% HP 0% power で蘇生する。',
																			_1: {
																				ctor: '::',
																				_0: 'Level 40 - Spirit Revival - Instant cast - 1875 radius - 再使用10分 - 25% power - 25% HP 10% power で蘇生する。',
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しくペットインスタントヒールが追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 1 - Instant Recovery - Instant cast - 2000 range - 再使用3分 - 15 power - ペットの体力を10%回復',
																					_1: {
																						ctor: '::',
																						_0: 'Level 11 - Instant Replenishment - Instant cast - 2000 range - 再使用3分 - 25 power - ペットの体力を25%回復',
																						_1: {
																							ctor: '::',
																							_0: 'Level 21 - Instant Mending - Instant cast - 2000 range - 再使用3分 - 35 power - ペットの体力を35%回復',
																							_1: {
																								ctor: '::',
																								_0: 'Level 31 - Instant Aid - Instant cast - 2000 range - 再使用3分 - 45 power - ペットの体力を50%回復',
																								_1: {
																									ctor: '::',
																									_0: 'Level 41 - Instant Respite - Instant cast - 2000 range - 再使用3分 - 55 power - ペットの体力を75%回復',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('新しく単体パワー転送スペルが追加される。'),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																						{
																							ctor: '::',
																							_0: 'Level 2 - Transfer Power - 詠唱3秒 - 1500 range - 25 power をターゲットに送る',
																							_1: {
																								ctor: '::',
																								_0: 'Level 12 - Transfer Essence - 詠唱3秒 - 1500 range - 40 power をターゲットに送る',
																								_1: {
																									ctor: '::',
																									_0: 'Level 22 - Transfer Force - 詠唱3秒 - 1500 range - 70 power をターゲットに送る',
																									_1: {
																										ctor: '::',
																										_0: 'Level 32 - Transfer Soul - 詠唱3秒 - 1500 range - 105 power をターゲットに送る',
																										_1: {
																											ctor: '::',
																											_0: 'Level 42 - Transfer Spirit - 詠唱3秒 - 1500 range - 150 power をターゲットに送る',
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('新しく PBAoE slow が追加される。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Level 3 - Otherworldly Dissipation - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 11 power - 10% slow',
																									_1: {
																										ctor: '::',
																										_0: 'Level 13 - Otherworldly Explosion - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 23 power - 20% slow',
																										_1: {
																											ctor: '::',
																											_0: 'Level 23 - Otherworldly Banish - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 35 power - 30% slow',
																											_1: {
																												ctor: '::',
																												_0: 'Level 33 - Otherworldly Destruction - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 50 power - 50% slow',
																												_1: {
																													ctor: '::',
																													_0: 'Level 43 - Otherworldly Annihilation - 詠唱2.5秒 - 半径400 - 持続時間15秒 - 62 power - 75% slow',
																													_1: {ctor: '[]'}
																												}
																											}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('新しく単体パワー吸収スペルが追加される。'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'Level 5 - Spirit Shock - 詠唱2.8秒 - 1500 range - 10 power - 24 spirit damage ダメージの 10% のパワーを得る',
																											_1: {
																												ctor: '::',
																												_0: 'Level 15 - Spirit Jolt - 詠唱2.8秒 - 1500 range - 21 power - 58 spirit damage ダメージの 10% のパワーを得る',
																												_1: {
																													ctor: '::',
																													_0: 'Level 25 - Spirit Burst - 詠唱2.8秒 - 1500 range - 29 power - 112 spirit damage ダメージの 10% のパワーを得る',
																													_1: {
																														ctor: '::',
																														_0: 'Level 35 - Spirit Siphon - 詠唱2.8秒 - 1500 range - 38 power - 143 spirit damage ダメージの 10% のパワーを得る',
																														_1: {
																															ctor: '::',
																															_0: 'Level 45 - Spirit Drain - 詠唱2.8秒 - 1500 range - 47 power - 189 spirit damage ダメージの 10% のパワーを得る',
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('新しく AoE ライフタップが追加される。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																												{
																													ctor: '::',
																													_0: 'Level 7 - Drain Area - 詠唱3秒 - 1500 range - 半径400 - 6 power - 28 spirit damage 詠唱者は与えたダメージの10%がヒールされる',
																													_1: {
																														ctor: '::',
																														_0: 'Level 17 - Drain Cluster - 詠唱3秒 - 1500 range - 半径400 - 15 power - Target takes 53 spirit damage 詠唱者は与えたダメージの10%がヒールされる',
																														_1: {
																															ctor: '::',
																															_0: 'Level 27 - Drain Circle - 詠唱3秒 - 1500 range - 半径400 - 26 power - Target takes 85 spirit damage 詠唱者は与えたダメージの10%がヒールされる',
																															_1: {
																																ctor: '::',
																																_0: 'Level 37 - Drain Pack - 詠唱3秒 - 1500 range - 半径400 - 34 power - Target takes 113 spirit damage 詠唱者は与えたダメージの10%がヒールされる',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 47 - Drain Formation - 詠唱3秒 - 1500 range - 半径400 - 45 power - Target takes 141 spirit damage 詠唱者は与えたダメージの10%がヒールされる',
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('フォーカスシールドは以下のように調整される。'),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																														{
																															ctor: '::',
																															_0: 'Level 9 - Spirit\'s Retaliation - 詠唱2.5秒 - 1350 range - 5 power/tick - ターゲットを物理攻撃する者は 6.8 spirit damage を受ける',
																															_1: {
																																ctor: '::',
																																_0: 'Level 19 - Spirit\'s Reckoning - 詠唱2.5秒 - 1350 range - 11 power/tick - ターゲットを物理攻撃する者は 15.1 spirit damage を受ける',
																																_1: {
																																	ctor: '::',
																																	_0: 'Level 29 - Spirit\'s Retribution - 詠唱2.5秒 - 1350 range - 15 power/tick - ターゲットを物理攻撃する者は 20.3 spirit damage を受ける',
																																	_1: {
																																		ctor: '::',
																																		_0: 'Level 39 - Spirit\'s Vindication - 詠唱2.5秒 - 1350 range - 20 power/tick - ターゲットを物理攻撃する者は 27.1 spirit damage を受ける',
																																		_1: {
																																			ctor: '::',
																																			_0: 'Level 49 - Spirit\'s Justification - 詠唱2.5秒 - 1350 range - 26 power/tick - ターゲットを物理攻撃する者は 33.9 spirit damage を受ける',
																																			_1: {ctor: '[]'}
																																		}
																																	}
																																}
																															}
																														}),
																													_1: {
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('新しく打ちっ放し型のペットが追加される。'),
																														_1: {
																															ctor: '::',
																															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																																{
																																	ctor: '::',
																																	_0: 'Level 50 - Gates of Valhalla - 詠唱10秒 - 半径400 - 12秒ごと - 持続時間2分 - 再使用10分 - 25% power - Gates of Valhalla を詠唱した場所に開く。Einherjar が飛び出し半径内の敵プレイヤーを24秒間攻撃する。',
																																	_1: {ctor: '[]'}
																																}),
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('スピリットマスター 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('スピリットマスターはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Suppression (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('single target mez が変更される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 24 mez の時間は40秒に短縮される。',
							_1: {
								ctor: '::',
								_0: 'Level 31 mez の時間は50秒に短縮される。',
								_1: {
									ctor: '::',
									_0: 'Level 40 mez の時間は60秒に短縮される。',
									_1: {
										ctor: '::',
										_0: 'Level 50 mez, Unmake Mind, は削除される。',
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Spiritmaster$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_121,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix2,
			A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix3, _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix4))));

var _Ragamuffine$daoc_patch_notes$Thane$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('セイン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('セインはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Stormcalling (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい single target energy damage type buff が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 32 - Gift of Lightning - 2.4s cast - 1500 range - 10% power - melee ダメージの属性を energy に変える。',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい self target pulsing PBAoE が追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 42 - Swirling Thunder - 2.5s cast - 再使用30秒 - 25秒間継続 - 20% power - 2.5 秒ごとに 26 energy damage を与える。移動中でも可能。妨害できない。',
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しい single target 射程延長バフが追加される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 49 - Thor\'s Reach - 2.5s cast - 再使用5分 - 1000 range - 25秒間継続 - 25% power - 魔法の射程とレジスト貫通を 15% 増加させる。(レジスト貫通の上限は10%である。)自分には使用できない。',
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('level 43 AoE energy debuff, Banish Energy, の効果は 24% から 30% に増加する。'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('group fatigue reduction buff はバフではなく pulse になる。'),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Thane$all = _Ragamuffine$daoc_patch_notes$Thane$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Theurgist$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('サージスト 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('サージストはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Earth (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Level 26, 36, 46 の pulsing bladeturn は最上位のスペルのみ有効になる。'),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Theurgist$all = _Ragamuffine$daoc_patch_notes$Theurgist$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_122B_HotFix3 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴェールウォーカー 1.122B Hot Fix #3'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('レベル50の Immolation ライフドレインは詠唱者とそのグループを一度だけヒールするようになる。'),
		_1: {ctor: '[]'}
	}
};
var _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴェールウォーカー 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('spirit resistance デバフは以下のように習性される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: '再使用タイマーが5秒から30秒に延長される。',
					_1: {
						ctor: '::',
						_0: 'Level 40 debuff Energy Void の効果は50%から40%に低下する。',
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴェールウォーカー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ヴェールウォーカーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Arboreal Path (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Level 45 lifedrain のダメージは 164 から 179 に増加する。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Arboreal Path (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('ABS buff のレベルが下げられる。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 20 ABS self-buff Moss Cover は Level 15 になる。',
									_1: {
										ctor: '::',
										_0: 'Level 30 ABS self-buff Moss Sheet は Level 25 になる。',
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('自己 celerity のレベルが下げられる。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 8 celerity Rushing Kudzu は Level 3 になる。',
											_1: {
												ctor: '::',
												_0: 'Level 38 celerity Celerity of Kudzu は Level 31 になる。',
												_1: {
													ctor: '::',
													_0: 'Level 48 celerity Rampant Speed は Level 49 になる。',
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('instant snare のレベルが下げられる。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 9 instant snare Hide Path は Level 2 になる。',
													_1: {
														ctor: '::',
														_0: 'Level 17 instant snare Obscure Path は Level 11 になる。',
														_1: {
															ctor: '::',
															_0: 'Level 37 instant snare Darken Path は Level 32 になる。',
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Level 39 Damage Add Bristled Weapons は Level 29 になる。'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('Level 40 AoE disease Blight Sworm は Level 39 になる。'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('instant DoT は削除される。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('新しい single DD が追加される。'),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																		{
																			ctor: '::',
																			_0: 'Level 6 - Nature\'s Rot - Instant cast - 再使用30秒 - 1500 range - 6 power - 40 matter damage.',
																			_1: {
																				ctor: '::',
																				_0: 'Level 12 - Nature\'s Decay - Instant cast - 再使用30秒 - 1500 range - 9 power - 58 matter damage.',
																				_1: {
																					ctor: '::',
																					_0: 'Level 23 - Nature\'s Blight - Instant cast - 再使用30秒 - 1500 range - 16 power - 86 matter damage.',
																					_1: {
																						ctor: '::',
																						_0: 'Level 35 - Nature\'s Venom - Instant cast - 再使用30秒 - 1500 range - 20 power - 115 matter damage.',
																						_1: {
																							ctor: '::',
																							_0: 'Level 42 - Nature\'s Bane - Instant cast - 再使用30秒 - 1500 range - 29 power - 160 matter damage.',
																							_1: {ctor: '[]'}
																						}
																					}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しい single DD が追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 8 - Minor Flashfire - 2.6s cast - 1500 range - 5 power - 23 heat damage.',
																					_1: {
																						ctor: '::',
																						_0: 'Level 18 - Lesser Flashfire - 2.6s cast - 1500 range - 10 power - 61 heat damage.',
																						_1: {
																							ctor: '::',
																							_0: 'Level 28 - Flashfire - 2.6s cast - 1500 range - 18 power - 102 heat damage.',
																							_1: {
																								ctor: '::',
																								_0: 'Level 38 - Searing Flashfire - 2.6s cast - 1500 range - 24 power - 137 heat damage.',
																								_1: {
																									ctor: '::',
																									_0: 'Level 48 - Scorching Flashfire - 2.6s cast - 1500 range - 33 power - 179 heat damage.',
																									_1: {ctor: '[]'}
																								}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('single target melee damage ablative は削除される。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$br,
																						{ctor: '[]'},
																						{ctor: '[]'}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('新しく group target melee ablative buff が追加される。'),
																						_1: {
																							ctor: '::',
																							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																								{
																									ctor: '::',
																									_0: 'Level 13 - Barkcrust - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 50 melee damage 吸収',
																									_1: {
																										ctor: '::',
																										_0: 'Level 26 - Barkcoat - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 100 melee damage 吸収',
																										_1: {
																											ctor: '::',
																											_0: 'Level 37 - Barksgeath - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 200 melee damage 吸収',
																											_1: {
																												ctor: '::',
																												_0: 'Level 50 - Barkshell - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 25% power - 300 melee damage 吸収',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('新しい spirit resistance debuff が追加される。'),
																								_1: {
																									ctor: '::',
																									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																										{
																											ctor: '::',
																											_0: 'Level 20 - Crumble Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - spirit resistance debuff 15%.',
																											_1: {
																												ctor: '::',
																												_0: 'Level 30 - Fade Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - spirit resistance debuff 30%.',
																												_1: {
																													ctor: '::',
																													_0: 'Level 40 - Vanquish Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - spirit resistance debuff 50%.',
																													_1: {ctor: '[]'}
																												}
																											}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Level 44 instant PBAoE disease は Level 37 になる。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Scythe (スペック)'),
																											_1: {
																												ctor: '::',
																												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																													{
																														ctor: '::',
																														_0: 'Level 15 - Thorny Shield - Sawgrass - damage shield に替わって 26% attack speed debuff',
																														_1: {
																															ctor: '::',
																															_0: 'Level 18 - Winter\'s Scythe - Foxfire - damage add に替わって 1% ABS debuff',
																															_1: {ctor: '[]'}
																														}
																													}),
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Valewalker$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121B, _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_122B_HotFix3));

var _Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴァルキリー 1.121B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('body resistance debuff は以下のように修正される。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
				{
					ctor: '::',
					_0: '再使用タイマーは5秒から30秒に延長する。',
					_1: {
						ctor: '::',
						_0: 'Level 40 debuff Bolster Spellcaster の効果は50%から40%に低下する。',
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴァルキリー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ヴァルキリーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Mending (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Odin\'s Will (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい body resistance debuff が追加される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 20 - Boost Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - body resistance 15%低下',
									_1: {
										ctor: '::',
										_0: 'Level 30 - Support Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - body resistance 30%低下',
										_1: {
											ctor: '::',
											_0: 'Level 40 - Bolster Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - body resistance 50%低下',
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Valkyrie$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121, _Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121B);

var _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴァンピール 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('Cloak of the Loyal Vampiir の powerdrain proc バフの発動率が 20% に増加する。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Vampiric Embrace (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Level 49 Hacking Claw - power cost は 36 から 28 に減少'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Dementia (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('ペットのレベルは召喚者と等しくなる。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Level 48 Arctic Claw - power cost は 36 から 28 に減少'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Shadow Mastery (スペック)'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Level 49 Blazing Claw - power cost は 36 から 28 に減少'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121C = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴァンピール 1.121C'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('以下の変化を反映するためにはリスペックが必要になる。'),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$br,
				{ctor: '[]'},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('effectiveness debuff は Dementia スペックに戻される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 1 - Hinder Senses - 2% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 1 power - 1 power パルスごとに',
							_1: {
								ctor: '::',
								_0: 'Level 9 - Weaken Senses - 9% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 3 power - 1 power パルスごとに',
								_1: {
									ctor: '::',
									_0: 'Level 19 - Diminish Senses - 19% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 9 power - 2 power パルスごとに',
									_1: {
										ctor: '::',
										_0: 'Level 29 - Abate Senses - 29% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 14 power - 3 power パルスごとに',
										_1: {
											ctor: '::',
											_0: 'Level 39 - Banish Senses - 39% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 19 power - 4 power パルスごとに',
											_1: {
												ctor: '::',
												_0: 'Level 47 - Devastate Senses - 47% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 23 power - 5 power パルスごとに',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('スキルデバフは Dementia スペックに戻される。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 14 - Impress Dread - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間10秒 - 6 power',
									_1: {
										ctor: '::',
										_0: 'Level 26 - Impress Ambiguity - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間15秒 - 12 power',
										_1: {
											ctor: '::',
											_0: 'Level 36 - Impress Confusion - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間20秒 - 18 power',
											_1: {
												ctor: '::',
												_0: 'Level 46 - Impress Amnesia - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間25秒 - 24 power',
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('すべてのスペックの Level 48 claw はパワーコストが 24 から 36 に増加する。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Dementia スペックの Summon Night\'s Servant スペルのパワーコストは 250 から 200 に減少する。ペットのヒットポイントは少し増加する。'),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ヴァンピール 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ヴァンピールはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Vampiric Embrace (スペック)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('fumble debuff は Shadow Mastery spec に移される。'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('NPC dismissal は削除される。'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Vampiir\'s Blaze はレベル35に移動される。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('celerity buff は Shadow Mastery から Vampiric Emrabce に移される。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'レベル11, Darkened Swiftness',
											_1: {
												ctor: '::',
												_0: 'レベル16, Darkened Quickness',
												_1: {
													ctor: '::',
													_0: 'レベル29, Darkened Alacrity',
													_1: {
														ctor: '::',
														_0: 'レベル36, Darkened Urgency',
														_1: {
															ctor: '::',
															_0: 'レベル45, Darkened Haste',
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('自己 Weaponskill バフと自己 Evasion バフのタイマーは共有される。自己 Parry バフとのタイマーは共有されない。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Dementia (スペック)'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('skill bonus debuff は削除される。'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('effectiveness debuff は削除される。'),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$br,
															{ctor: '[]'},
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('新しい instant cast 召喚ペットがレベル38 Dementia に追加される。このペットはヴァンピールの88%のレベルである。このペットがターゲットを攻撃するとターゲットのパワーを吸収しヴァンピールに転送する。(ターゲットがプレイヤーである場合のみ。)召喚するのに300パワーを使用する。最大5分間持続する。その前にリリースすることができる。再使用タイマーはない。'),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$br,
																	{ctor: '[]'},
																	{ctor: '[]'}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('召喚ペットを犠牲にするスキルがレベル42 Dementia に追加される。このスキルを使用するとペットを失うと同時にヴァンピールから root/snare 効果を取り除く。このスキルは攻撃中、移動中でも使用可能で妨害できない。再使用10分。詠唱時間3.5 秒。'),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Shadow Mastery (スペック)'),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('fumble debuff は Shadow Mastery レベル11, 21, 32 に移される。'),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('celerity buff は Vampiric Embrace spec に移される。'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('Vampiir\'s Speed はレベル10 SM に移される。'),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('Flaring Claw はレベル18 SM に移される。'),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('Vampiir\'s Strike はレベル19 SM に移される。'),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Renewal はレベル20 SM に移される。'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('レベル 32 Endurance Drain, Enervating Embrace は削除される。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Piercing Spec'),
																										_1: {
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('新しいスタイル Vampiir\'s Bite が 45 Pierce に追加される。5 秒背後スタン。'),
																											_1: {ctor: '[]'}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Vampiir$all = A2(
	_elm_lang$core$Basics_ops['++'],
	_Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121,
	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121C, _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_122B));

var _Ragamuffine$daoc_patch_notes$Warden$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォーデン 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (基本)'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('Level 45 - Superior Skin of the Redwood - AF の値は 55 から 150 に増加する。'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blades (スペック)'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('Stone Shaper は ABS debuff ではなく武器スキル25%増加になる。ダメージも増加する。'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$br,
							{ctor: '[]'},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('Stone Temper は ABS debuff の効果を持つ。20秒持続する。ダメージは減少する。防御ペナルティーは減少する。'),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$br,
									{ctor: '[]'},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html$text('Stone Breaker の防御ペナルティーは減少する。'),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Warden$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォーデン 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ウォーデンはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Regrowth (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Regrowth (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('新しい pulsing poison cure を追加'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 14 - Pulsing Cure Poison I - 3.5s cast - 2000 range - 20 power',
									_1: {
										ctor: '::',
										_0: 'Level 28 - Pulsing Cure Poison II - 3.7s cast - 2000 range - 25 power',
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('新しい pulsing disease cure を追加'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 18 - Pulsing Cure Disease I - 3.5s cast - 2000 range - 20 power',
											_1: {
												ctor: '::',
												_0: 'Level 36 - Pulsing Cure Disease II - 3.7s cast - 2000 range - 28 power',
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Nurture (スペック)'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('Fury of Nature の持続時間を30秒から15秒に変更する。'),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$br,
													{ctor: '[]'},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。3秒ごと。この buff は CL buff およびバードの resist buff とスタックしない。'),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
															{
																ctor: '::',
																_0: 'Level 13 - Glimmer Shield - Spirit/Energy/Body resist 12%増加',
																_1: {
																	ctor: '::',
																	_0: 'Level 30 - Glimmer Guard - Spirit/Energy/Body resist 18%増加',
																	_1: {
																		ctor: '::',
																		_0: 'Level 40 - Glimmer Barrier - Spirit/Energy/Body resist 24%増加',
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Shield (スペック)'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 44 - Immobilize - 側面 - 21s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.',
																		_1: {
																			ctor: '::',
																			_0: 'Level 46 - Cripple - 背後 - 23s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.',
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blades (スペック)'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('新しいスタイルが追加される。'),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																				{
																					ctor: '::',
																					_0: 'Level 32 - Stone Shaper - Anytime - Very High endurance cost, Medium Damage, Low Hit Bonus, Medium Defense Penalty - 10秒間 -50 ABS debuff',
																					_1: {
																						ctor: '::',
																						_0: 'Level 40 - Stone Temper - Stone Shaper - Very High endurance cost, Very Low damage, No Hit Bonus, Low Defense Penalty - ターゲットのあらゆる ABS debuff を除去し、自分の weaponskill を25秒間25%増加させる。',
																						_1: {
																							ctor: '::',
																							_0: 'Level 40 - Stone Breaker - Stone Shaper - Very High endurance cost, Very High damage, High Hit Bonus, Very High Defense Penalty - ターゲットの ABS debuff と自分の weaponskill buff を除去する。',
																							_1: {ctor: '[]'}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$sechib('Blunt (スペック)'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('新しいスタイルが追加される。'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Level 23 - Forest Protector - Anytime - Very High endurance cost, Medium Damage, Low Hit Bonus, Low Defensive Bonus - 自分が行うヒール量を25秒間50%増加させる。',
																								_1: {
																									ctor: '::',
																									_0: 'Level 32 - Forest Executioner - Follows Forest Protector - Very High endurance cost, Very High Damage, Low Hit Penalty, Low Defensive Bonus - ターゲットが行うヒール量を25秒間50%低下させる。',
																									_1: {ctor: '[]'}
																								}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Warden$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Warden$patch_1_121, _Ragamuffine$daoc_patch_notes$Warden$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Warlock$patch_1_122B = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォーロック 1.122B'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ウォーロックはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Cursing (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('単体 DD 呪文は matter から spirit 属性に変更された。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Witchcraft (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('単体 AF デバフは変更されている。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 30 - Degrade Armor - 50 から 100 に増加',
									_1: {
										ctor: '::',
										_0: 'Level 40 - Rot Armor - 100 から 165 に増加',
										_1: {
											ctor: '::',
											_0: 'Level 50 - Erode Armor - 150 から 250 に増加',
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Doom は essence 属性に変更された。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hexing (スペック)'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('単体ペット fear (退散後に60秒の無効時間が存在する)は以下のように変更になる。'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 1 - Fear Slave - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
													_1: {
														ctor: '::',
														_0: 'Level 11 - Expel Slave - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
														_1: {
															ctor: '::',
															_0: 'Level 21 - Intimidate Slave - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
															_1: {
																ctor: '::',
																_0: 'Level 31 - Daunt Slave - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																_1: {
																	ctor: '::',
																	_0: 'Level 41 - Terrify Slave - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('新しいペット fear に応じて以下の呪文が変更になる。'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 31 - Hex of Tangling Root は level 28 になる。',
															_1: {
																ctor: '::',
																_0: 'Level 41 - Hex of Hindering は level 36 になる。',
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Warlock$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォーロック 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ウォーロックはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォーロックはレルムアビリティーをリスペックされる。'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('レルムアビリティーに Ichor of the Deep が追加される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Witchcraft (スペック)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('すべての DoT は除去され新しい DoT に置き換えられる。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Dread'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 8 - Weak Dread - 25秒間継続 - 5秒ごと - 10 body damage - 自分に対し 10 magic-ablative buff - instant cast',
											_1: {
												ctor: '::',
												_0: 'Level 22 - Minor Dread - 25秒間継続 - 5秒ごと - 20 body damage - 自分に対し 25 magic-ablative buff - instant cast',
												_1: {
													ctor: '::',
													_0: 'Level 32 - Lesser Dread - 25秒間継続 - 5秒ごと - 35 body damage - 自分に対し 50 magic-ablative self - instant cast',
													_1: {
														ctor: '::',
														_0: 'Level 42 - Dread - 25秒間継続 - 5秒ごと - 55 body damage - 自分に対し 100 magic-ablative buff - instant cast',
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Anguish'),
										_1: {
											ctor: '::',
											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
												{
													ctor: '::',
													_0: 'Level 14 - Weak Anguish - 30秒間継続 - 4秒ごと - 12 matter damage - 3s cast time',
													_1: {
														ctor: '::',
														_0: 'Level 24 -Minor Anguish - 30秒間継続 - 4秒ごと - 37 matter damage - 3s cast time',
														_1: {
															ctor: '::',
															_0: 'Level 34 - Lesser Anguish - 30秒間継続 - 4秒ごと - 47 matter damage - 3s cast time',
															_1: {
																ctor: '::',
																_0: 'Level 44 - Anguish - 30秒間継続 - 4秒ごと - 60 matter damage - 3s cast time',
																_1: {ctor: '[]'}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Agony - Dread と Anguish が効果中であるターゲットに使用できる'),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
														{
															ctor: '::',
															_0: 'Level 27 - Minor Agony - 25秒間継続 - 3秒ごと - 30 cold damage - 3s cast time - disease',
															_1: {
																ctor: '::',
																_0: 'Level 37 - Lesser Agony - 25秒間継続 - 3秒ごと - 60 cold damage - 3s cast time - disease',
																_1: {
																	ctor: '::',
																	_0: 'Level 47 - Agony - 25秒間継続 - 3秒ごと - 110 cold damage - 3s cast time - disease',
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Doom - Dread, Anguish, Agony がすべて効果中のターゲットに使用できる'),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																{
																	ctor: '::',
																	_0: 'Level 50 - Doom - 10秒間継続 - 2.5秒ごと - 205 spirit damage - 3s cast time - cure されるまたは効果が切れると 700 direct damage. パージされた時のみ回避可能。',
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Warlock$all = A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Warlock$patch_1_121, _Ragamuffine$daoc_patch_notes$Warlock$patch_1_122B);

var _Ragamuffine$daoc_patch_notes$Warrior$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウォリアー 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ウォリアーはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Shield (スペック)'),
			_1: {
				ctor: '::',
				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
					{
						ctor: '::',
						_0: 'Level 44 - Immobilize - 21 秒 side snare, Low defensive bonus, high end cost, low damage.',
						_1: {
							ctor: '::',
							_0: 'Level 46 - Cripple - 23 秒 back snare,  Low defensive bonus, high end cost, low damage.',
							_1: {
								ctor: '::',
								_0: 'Level 50 - Battle Control - PBAoE grapple - 半径400 - 最大 5 ターゲット. 再使用 10 分, instant cast, grapple タイマーを無視する',
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Axe (スペック)'),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
							{
								ctor: '::',
								_0: 'Level 15 - Evernight - Rear positional - Damage increased from Medium to High',
								_1: {
									ctor: '::',
									_0: 'Level 29 - Havoc - Anytime - ダメージ減少',
									_1: {
										ctor: '::',
										_0: 'Level 39 - Glacial Movement - Side - ダメージ増加',
										_1: {
											ctor: '::',
											_0: 'Level 44 - Arctic Rfit - Evernight - ダメージ増加',
											_1: {
												ctor: '::',
												_0: 'Level 50 - Tyr\'s Fury - Glacial Movement - ダメージやや増加',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Hammer (スペック)'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 18 - Demolish - Frost Hammer - ダメージ増加',
										_1: {
											ctor: '::',
											_0: 'Level 29 - Conquer - Rear - ダメージ増加',
											_1: {
												ctor: '::',
												_0: 'Level 32 - Comminute - Anytime - ダメージ減少',
												_1: {
													ctor: '::',
													_0: 'Level 44 - Sledgehammer - Conquer - ダメージ増加',
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$secmid('Sword (スペック)'),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
											{
												ctor: '::',
												_0: 'Level 15 - Aurora - Northern Lights - ダメージやや増加',
												_1: {
													ctor: '::',
													_0: 'Level 34 - Polar Rift - Anytime - ダメージ減少',
													_1: {
														ctor: '::',
														_0: 'Level 50 - Ragnarok - Rear - ダメージ増加',
														_1: {ctor: '[]'}
													}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Warrior$all = _Ragamuffine$daoc_patch_notes$Warrior$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Wizard$patch_1_121 = {
	ctor: '::',
	_0: A2(
		_elm_lang$html$Html$h2,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('ウィザード 1.121'),
			_1: {ctor: '[]'}
		}),
	_1: {
		ctor: '::',
		_0: _elm_lang$html$Html$text('ウィザードはフルリスペックされる。'),
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Fire Magic (基本)'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しい自分を対象にした grapple を追加'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Level 45 - Flame Cocoon - Instant cast - 再使用5分 - 7秒間継続 - melee 攻撃を防ぎ、1.5秒ごとに200HP回復する。この間 silence 状態で移動はできない。grapple はいつでも解除できるが silence 状態は継続される。',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$secalb('Cold Magic (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('新しい grapple を追加'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Level 44 - Ice Grip - 3s cast - 1500 range - 再使用5分 - 6秒間継続 - ターゲットに対するすべての攻撃は無効になる。ターゲットは物理攻撃を行うことが可能である。',
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _Ragamuffine$daoc_patch_notes$Wizard$all = _Ragamuffine$daoc_patch_notes$Wizard$patch_1_121;

var _Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121C = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.121C'),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Archer'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Standard Shot の詠唱時間は4.0秒から4.2秒に増加する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Critical Shot のダメージはやや減少する。'),
						_1: {
							ctor: '::',
							_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
								{
									ctor: '::',
									_0: 'Level 5 - Critical Shot 1 のダメージは 15 から 14 に減少',
									_1: {
										ctor: '::',
										_0: 'Level 11 - Critical Shot 2 のダメージは 50 から 48 に減少',
										_1: {
											ctor: '::',
											_0: 'Level 17 - Critical Shot 3 のダメージは 90 から 88 に減少',
											_1: {
												ctor: '::',
												_0: 'Level 23 - Critical Shot 4 のダメージは 129 から 126 に減少',
												_1: {
													ctor: '::',
													_0: 'Level 29 - Critical Shot 5 のダメージは 168 から 164 に減少',
													_1: {
														ctor: '::',
														_0: 'Level 35 - Critical Shot 6 のダメージは 209 から 204 に減少',
														_1: {
															ctor: '::',
															_0: 'Level 41 - Critical Shot 7 のダメージは 248 から 242 に減少',
															_1: {
																ctor: '::',
																_0: 'Level 47 - Critical Shot 8 のダメージは 288 から 285 に減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 50 - Critical Shot 9 のダメージは 308 から 305 に減少',
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Power Shot のダメージは減少する。'),
								_1: {
									ctor: '::',
									_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
										{
											ctor: '::',
											_0: 'Level 3 - Power Shot 1 のダメージは 15 から 12 に減少',
											_1: {
												ctor: '::',
												_0: 'Level 9 - Power Shot 2 のダメージは 50 から 45 に減少',
												_1: {
													ctor: '::',
													_0: 'Level 15 - Power Shot 3 のダメージは 90 から 86 に減少',
													_1: {
														ctor: '::',
														_0: 'Level 21 - Power Shot 4 のダメージは 129 から 123 に減少',
														_1: {
															ctor: '::',
															_0: 'Level 27 - Power Shot 5 のダメージは 168 から 160 に減少',
															_1: {
																ctor: '::',
																_0: 'Level 33 - Power Shot 6 のダメージは 209 から 194 に減少',
																_1: {
																	ctor: '::',
																	_0: 'Level 39 - Power Shot 7 のダメージは 248 から 230 に減少',
																	_1: {
																		ctor: '::',
																		_0: 'Level 45 - Power Shot 8 のダメージは 288 から 279 に減少',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('Critical Shot と Power Shot のダメージ無効時間は10秒から15秒に延長される。ただし最後の5秒間でダメージ緩和量が急速に縮小する。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Heightened Awareness のステルス検知の効果は10%から20%に増加する。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$h2,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Assassin'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Heightened Awareness のステルス検知の効果は10%から20%に増加する。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('Vanish の disarm と silence の持続時間は15秒から30秒に延長される。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('Level 39 Critical Strikes スタイル Stunning Stab の前提は Creeping Death から Hamstring に変更される。その効果は3% abs debuff から 10秒 wither に変更される。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$br,
																				{ctor: '[]'},
																				{ctor: '[]'}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('armor wither の debuff 量はやや増加する。そのため armor wither 状態のターゲットへの Shot スタイルを使用した場合のダメージは着実に増加するはずである。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$br,
																						{ctor: '[]'},
																						{ctor: '[]'}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('mesmerization poison は remedy 状態のターゲットにも適用されるようになる。mesmerization poison は「Envenom」の項目ではなく「Abilities」の項目に置かれるようになるが Envenom スペックであることは変わらない。'),
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Animist$patch_1_121C,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Friar$patch_1_121C,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Hunter$patch_1_121C,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121C,
					A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121C, _Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121C))))));
var _Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121B = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.121B'),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('ベインロード'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('Agony Transmission の Health/Power/Endurance コストは60%から75%に増加する。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Archer'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$seccommon('Stealth (スペック)'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('新しい能力 Heightened Awareness が Level 30 に追加される。'),
							_1: {
								ctor: '::',
								_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
									{
										ctor: '::',
										_0: 'Heightened Awareness - 持続時間6秒のバフを行う pulse を20分間継続する - pulse の周期は5秒 - グループターゲット - 10% stealth detection bonus - Archer, Assassin, ミンストレルには影響しない',
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h2,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Assassin'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _Ragamuffine$daoc_patch_notes$Style$seccommon('Envenom (スペック)'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('DoT Poison'),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
													{
														ctor: '::',
														_0: 'Level 45 - Insidious Lethal Venom - DoT の初回のダメージを72から68に減少、第二撃のダメージを46から43に減少',
														_1: {
															ctor: '::',
															_0: 'Level 50 - Lifebane - DoT の初回のダメージを88から82に減少、第二撃のダメージを88から82に減少',
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text('Stat-Debuff Poison'),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$br,
															{ctor: '[]'},
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text('constitution debuff の効果を 50% 減少、Level 37 と Level 47 の Strength/Dexterity debuff の効果をやや減少。'),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																	{
																		ctor: '::',
																		_0: 'Level 7 - Weakening Poison - 6 Constitution',
																		_1: {
																			ctor: '::',
																			_0: 'Level 17 - Inhibiting Poison - 12 Constitution',
																			_1: {
																				ctor: '::',
																				_0: 'Level 27 - Enervating Poison - 15 Constitution',
																				_1: {
																					ctor: '::',
																					_0: 'Level 37 - Unnerving Poison - 20 Constitution, 40 Strength, 40 Dexterity',
																					_1: {
																						ctor: '::',
																						_0: 'Level 47 - Touch of Death - 30 Constitution, 55 Strength, 55 Dexterity',
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('weaponskill debuff の効果は変わらず。'),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$br,
																			{ctor: '[]'},
																			{ctor: '[]'}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('Mesmerize Poison'),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																					{
																						ctor: '::',
																						_0: 'Level 46 - Tranquilizing Miasma - 持続時間を15秒から10秒に減少',
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _Ragamuffine$daoc_patch_notes$Style$seccommon('Critical Strike (スペック)'),
																					_1: {
																						ctor: '::',
																						_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																							{
																								ctor: '::',
																								_0: 'Neck Shot - ダメージ大幅減少',
																								_1: {
																									ctor: '::',
																									_0: 'Rib Shot - ダメージ大幅減少',
																									_1: {
																										ctor: '::',
																										_0: 'Hip Shot - ダメージ大幅減少',
																										_1: {ctor: '[]'}
																									}
																								}
																							}),
																						_1: {
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('ただし wither 効果中の相手に対しては高ダメージのままである。'),
																							_1: {
																								ctor: '::',
																								_0: _Ragamuffine$daoc_patch_notes$Style$seccommon('Stealth (スペック)'),
																								_1: {
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('新しい能力 Heightened Awareness が 45 stealth に追加される。'),
																									_1: {
																										ctor: '::',
																										_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																											{
																												ctor: '::',
																												_0: 'Heightened Awareness - 持続時間20分のバフを6秒ごとに pulse する - 5秒ごとの pulse - group target - 10% stealth detection bonus - Archer, Assassin, Minstrel に対しては無効',
																												_1: {ctor: '[]'}
																											}),
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Champion$patch_1_121B,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Friar$patch_1_121B,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Hunter$patch_1_121B,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Reaver$patch_1_121B,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Savage$patch_1_121B,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121B,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Shaman$patch_1_121B,
									A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121B, _Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121B))))))))));
var _Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121 = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.121'),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('クラス全般'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('すべての root と mesmerization スペルの属性は以下のように変更になる。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$dl,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('uk-description-list-horizontal'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$dt,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('アルビオン'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$dd,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('energy'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$dt,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('ミッドガルド'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$dd,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('body'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$dt,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('ヒベルニア'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$dd,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('spirit'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('CC 属性に対する instant resist debuff が各レルムに追加される。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Champion Level の disease の射程は 1500 から 1000 に減らされる。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('すべてのクラスは同時に 8 までの pulse を維持することができる。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$br,
												{ctor: '[]'},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('すべての resist debuff スペルの効果は中レベルでは25%から30%に強化される。高レベルでは40%から50%に強化される。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('キャスターの instant stat debuff スペルの再使用タイマーは10秒から7秒に短縮される。持続時間と効果はそのままである。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('melee style のダメージは調整される。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('buff shear から得られるレルムポイントは大幅に減らされる。'),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$h2,
																				{ctor: '[]'},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('アイテム'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('いくつかの CL15 武器が持つ fumble debuff は weapon skill debuff に変更される。'),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$h2,
																						{ctor: '[]'},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('バトルマスターレベル'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('グラップルは1分間の無効タイマーを持つ。ただし以下に出てくる新しいグラップルとはタイマーを共有しない。'),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$br,
																								{ctor: '[]'},
																								{ctor: '[]'}),
																							_1: {
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('Essence Flames と Essence Shatter のダメージはやや減少させられる。'),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$h2,
																										{ctor: '[]'},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('スパイマスターレベル'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('Enduring Poison (ML3) は essence resist buff に変更される。'),
																										_1: {
																											ctor: '::',
																											_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																												{
																													ctor: '::',
																													_0: 'Essence Armor - 25% essence resist buff - 自己バフ - 持続時間20分',
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('Essence Flare (ML9, Mez Poison) は武器攻撃を essence damage に変える自己バフになる。'),
																												_1: {
																													ctor: '::',
																													_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
																														{
																															ctor: '::',
																															_0: 'Essence Blades - 再使用5分 - instant cast – 持続時間10秒',
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_elm_lang$html$Html$h2,
																															{ctor: '[]'},
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('コンボーカーマスターレベル'),
																																_1: {ctor: '[]'}
																															}),
																														_1: {
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('Convoker ML2 Prescience Node は詠唱時間2秒、再使用5分、持続時間5分になる。'),
																															_1: {
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('ground target ではなくキャスターの足元に出現する。'),
																																_1: {ctor: '[]'}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Animist$patch_1_121,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Armsman$patch_1_121,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Bainshee$patch_1_121,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Bard$patch_1_121,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Berserker$patch_1_121,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Blademaster$patch_1_121,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_121,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_121,
									A2(
										_elm_lang$core$Basics_ops['++'],
										_Ragamuffine$daoc_patch_notes$Champion$patch_1_121,
										A2(
											_elm_lang$core$Basics_ops['++'],
											_Ragamuffine$daoc_patch_notes$Cleric$patch_1_121,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_Ragamuffine$daoc_patch_notes$Druid$patch_1_121,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_Ragamuffine$daoc_patch_notes$Eldritch$patch_1_121,
													A2(
														_elm_lang$core$Basics_ops['++'],
														_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_121,
														A2(
															_elm_lang$core$Basics_ops['++'],
															_Ragamuffine$daoc_patch_notes$Friar$patch_1_121,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_Ragamuffine$daoc_patch_notes$Healer$patch_1_121,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_Ragamuffine$daoc_patch_notes$Heretic$patch_1_121,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_Ragamuffine$daoc_patch_notes$Hero$patch_1_121,
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			_Ragamuffine$daoc_patch_notes$Hunter$patch_1_121,
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				_Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_121,
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					_Ragamuffine$daoc_patch_notes$Mauler$patch_1_121,
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						_Ragamuffine$daoc_patch_notes$Mentalist$patch_1_121,
																						A2(
																							_elm_lang$core$Basics_ops['++'],
																							_Ragamuffine$daoc_patch_notes$Mercenary$patch_1_121,
																							A2(
																								_elm_lang$core$Basics_ops['++'],
																								_Ragamuffine$daoc_patch_notes$Minstrel$patch_1_121,
																								A2(
																									_elm_lang$core$Basics_ops['++'],
																									_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_121,
																									A2(
																										_elm_lang$core$Basics_ops['++'],
																										_Ragamuffine$daoc_patch_notes$Nightshade$patch_1_121,
																										A2(
																											_elm_lang$core$Basics_ops['++'],
																											_Ragamuffine$daoc_patch_notes$Paladin$patch_1_121,
																											A2(
																												_elm_lang$core$Basics_ops['++'],
																												_Ragamuffine$daoc_patch_notes$Ranger$patch_1_121,
																												A2(
																													_elm_lang$core$Basics_ops['++'],
																													_Ragamuffine$daoc_patch_notes$Reaver$patch_1_121,
																													A2(
																														_elm_lang$core$Basics_ops['++'],
																														_Ragamuffine$daoc_patch_notes$Runemaster$patch_1_121,
																														A2(
																															_elm_lang$core$Basics_ops['++'],
																															_Ragamuffine$daoc_patch_notes$Savage$patch_1_121,
																															A2(
																																_elm_lang$core$Basics_ops['++'],
																																_Ragamuffine$daoc_patch_notes$Scout$patch_1_121,
																																A2(
																																	_elm_lang$core$Basics_ops['++'],
																																	_Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_121,
																																	A2(
																																		_elm_lang$core$Basics_ops['++'],
																																		_Ragamuffine$daoc_patch_notes$Shaman$patch_1_121,
																																		A2(
																																			_elm_lang$core$Basics_ops['++'],
																																			_Ragamuffine$daoc_patch_notes$Skald$patch_1_121,
																																			A2(
																																				_elm_lang$core$Basics_ops['++'],
																																				_Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_121,
																																				A2(
																																					_elm_lang$core$Basics_ops['++'],
																																					_Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_121,
																																					A2(
																																						_elm_lang$core$Basics_ops['++'],
																																						_Ragamuffine$daoc_patch_notes$Thane$patch_1_121,
																																						A2(
																																							_elm_lang$core$Basics_ops['++'],
																																							_Ragamuffine$daoc_patch_notes$Theurgist$patch_1_121,
																																							A2(
																																								_elm_lang$core$Basics_ops['++'],
																																								_Ragamuffine$daoc_patch_notes$Valewalker$patch_1_121,
																																								A2(
																																									_elm_lang$core$Basics_ops['++'],
																																									_Ragamuffine$daoc_patch_notes$Valkyrie$patch_1_121,
																																									A2(
																																										_elm_lang$core$Basics_ops['++'],
																																										_Ragamuffine$daoc_patch_notes$Vampiir$patch_1_121,
																																										A2(
																																											_elm_lang$core$Basics_ops['++'],
																																											_Ragamuffine$daoc_patch_notes$Warden$patch_1_121,
																																											A2(
																																												_elm_lang$core$Basics_ops['++'],
																																												_Ragamuffine$daoc_patch_notes$Warlock$patch_1_121,
																																												A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Warrior$patch_1_121, _Ragamuffine$daoc_patch_notes$Wizard$patch_1_121)))))))))))))))))))))))))))))))))))))))))))));

var _Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix4 = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.122B Hot Fix #4'),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('クラス全般'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('いくつかのペットが魔法ダメージを食らわない問題は修正される。'),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$br,
						{ctor: '[]'},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Speed of Sound レルムアビリティーが slow によって解除されないようになる。'),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix4,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix4,
			A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix4, _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix4))));
var _Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix3 = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.122B Hot Fix #3'),
				_1: {ctor: '[]'}
			}),
		_1: {ctor: '[]'}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix3,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix3,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix3,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix3,
					A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix3, _Ragamuffine$daoc_patch_notes$Valewalker$patch_1_122B_HotFix3))))));
var _Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix2 = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.122B Hot Fix #2'),
				_1: {ctor: '[]'}
			}),
		_1: {ctor: '[]'}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix2,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B_HotFix2,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Champion$patch_1_122B_HotFix2,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix2,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B_HotFix2,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix2,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Savage$patch_1_122B_HotFix2,
								A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Skald$patch_1_122B_HotFix2, _Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B_HotFix2)))))))));
var _Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.122B Hot Fix'),
				_1: {ctor: '[]'}
			}),
		_1: {ctor: '[]'}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B_HotFix,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Druid$patch_1_122B_HotFix,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B_HotFix,
				A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B_HotFix, _Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B_HotFix)))));
var _Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B = A2(
	_elm_lang$core$Basics_ops['++'],
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$h1,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('Patch 1.122B'),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('クラス全般'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text('新しいクラウドコントロール効果 Slow が導入される。'),
				_1: {
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Style$ulist(
						{
							ctor: '::',
							_0: 'Slow 状態のターゲットは戦闘時・非戦闘時両方で速度が低下する。',
							_1: {
								ctor: '::',
								_0: 'Slow 状態に無効タイマーはない。',
								_1: {
									ctor: '::',
									_0: 'Slow は root または snare と重複する。',
									_1: {
										ctor: '::',
										_0: 'Slow 状態はダメージで解除されない。',
										_1: {
											ctor: '::',
											_0: 'Slow 状態中の速度低下効果は一定である。徐々に解除されるようなことはない。',
											_1: {
												ctor: '::',
												_0: 'root または snare 無効中であっても Slow 状態になる。',
												_1: {
													ctor: '::',
													_0: 'Slow 効果は詠唱妨害ではない。',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text('Astral Blade of Illusions, Astral Conflagrant Short Sword, Astral Conflagrant Hatchet, Astral Voltaics 系武器, Traitor\'s Dagger の proc rate はやや減少する。'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$br,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text('Camelot Cleric, Jordheim Shaman, Tir na Nog Druid NPC の販売するベースAFバフの効果は125に強化される。'),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$br,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('NPCバフは Necromancer 本人にのみ適用されペットには影響しない。'),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$h2,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('バグ修正'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Loyalty Cloak の /use タイマーは正しく90秒になる。'),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$br,
														{ctor: '[]'},
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text('Loyal cloak を使うには cloak のレベルを 5 以上にする必要がある。以前は level 1 でアビリティーを使用可能だった cloak がある。'),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$br,
																{ctor: '[]'},
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text('マーセナリー、ブレードマスター、バーサーカー、ザベジは Loyal Cloak を再び使えるようになる。'),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$br,
																		{ctor: '[]'},
																		{ctor: '[]'}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('浅い水面の水が飛び散るアニメーションを変更しラグを大幅に削減した。'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	A2(
		_elm_lang$core$Basics_ops['++'],
		_Ragamuffine$daoc_patch_notes$Animist$patch_1_122B,
		A2(
			_elm_lang$core$Basics_ops['++'],
			_Ragamuffine$daoc_patch_notes$Bainshee$patch_1_122B,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_Ragamuffine$daoc_patch_notes$Bard$patch_1_122B,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Bonedancer$patch_1_122B,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Cabalist$patch_1_122B,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Champion$patch_1_122B,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Cleric$patch_1_122B,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Druid$patch_1_122B,
									A2(
										_elm_lang$core$Basics_ops['++'],
										_Ragamuffine$daoc_patch_notes$Enchanter$patch_1_122B,
										A2(
											_elm_lang$core$Basics_ops['++'],
											_Ragamuffine$daoc_patch_notes$Friar$patch_1_122B,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_Ragamuffine$daoc_patch_notes$Healer$patch_1_122B,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_Ragamuffine$daoc_patch_notes$Heretic$patch_1_122B,
													A2(
														_elm_lang$core$Basics_ops['++'],
														_Ragamuffine$daoc_patch_notes$Hunter$patch_1_122B,
														A2(
															_elm_lang$core$Basics_ops['++'],
															_Ragamuffine$daoc_patch_notes$Infiltrator$patch_1_122B,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_Ragamuffine$daoc_patch_notes$Minstrel$patch_1_122B,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_Ragamuffine$daoc_patch_notes$Necromancer$patch_1_122B,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_Ragamuffine$daoc_patch_notes$Nightshade$patch_1_122B,
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			_Ragamuffine$daoc_patch_notes$Paladin$patch_1_122B,
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				_Ragamuffine$daoc_patch_notes$Ranger$patch_1_122B,
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					_Ragamuffine$daoc_patch_notes$Savage$patch_1_122B,
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						_Ragamuffine$daoc_patch_notes$Scout$patch_1_122B,
																						A2(
																							_elm_lang$core$Basics_ops['++'],
																							_Ragamuffine$daoc_patch_notes$Shadowblade$patch_1_122B,
																							A2(
																								_elm_lang$core$Basics_ops['++'],
																								_Ragamuffine$daoc_patch_notes$Shaman$patch_1_122B,
																								A2(
																									_elm_lang$core$Basics_ops['++'],
																									_Ragamuffine$daoc_patch_notes$Skald$patch_1_122B,
																									A2(
																										_elm_lang$core$Basics_ops['++'],
																										_Ragamuffine$daoc_patch_notes$Sorcerer$patch_1_122B,
																										A2(
																											_elm_lang$core$Basics_ops['++'],
																											_Ragamuffine$daoc_patch_notes$Spiritmaster$patch_1_122B,
																											A2(
																												_elm_lang$core$Basics_ops['++'],
																												_Ragamuffine$daoc_patch_notes$Vampiir$patch_1_122B,
																												A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Warden$patch_1_122B, _Ragamuffine$daoc_patch_notes$Warlock$patch_1_122B)))))))))))))))))))))))))))));

var _Ragamuffine$daoc_patch_notes$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$none;
};
var _Ragamuffine$daoc_patch_notes$Main$update = F2(
	function (message, model) {
		return {ctor: '_Tuple2', _0: message, _1: _elm_lang$core$Platform_Cmd$none};
	});
var _Ragamuffine$daoc_patch_notes$Main$raw_link = function (link) {
	return A2(
		_elm_lang$html$Html$a,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$href(link),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(link),
			_1: {ctor: '[]'}
		});
};
var _Ragamuffine$daoc_patch_notes$Main$top_menu = A2(
	_elm_lang$html$Html$nav,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$class('uk-navbar'),
		_1: {ctor: '[]'}
	},
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$ul,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('uk-navbar-nav'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$li,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$TopPage),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('DAoC Patch Notes'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$li,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$a,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$AlbionPage),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('アルビオン'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$li,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$a,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MidgardPage),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('ミッドガルド'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$li,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HiberniaPage),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('ヒベルニア'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			}),
		_1: {ctor: '[]'}
	});
var _Ragamuffine$daoc_patch_notes$Main$top_page = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$make_top_content(
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('パッチノート'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$ul,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$li,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_121_Page),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('1.121'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text(' 公式リンク '),
											_1: {
												ctor: '::',
												_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/content/1121-live-patch-notes'),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text(' (2016/7/26)'),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$li,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$a,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_121B_Page),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('1.121B'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text(' 公式リンク '),
												_1: {
													ctor: '::',
													_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/content/1121b-live-patch-notes'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text(' (2016/8/16)'),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$li,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$a,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_121C_Page),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('1.121C'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$html$Html$text(' 公式リンク '),
													_1: {
														ctor: '::',
														_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/article/1121c-hot-fix-update'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text(' (2016/8/24)'),
															_1: {ctor: '[]'}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$li,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('1.122A(クラスの変更なし)'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html$text(' 公式リンク '),
														_1: {
															ctor: '::',
															_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/content/1122a-live-patch-notes'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text(' (2016/9/23)'),
																_1: {ctor: '[]'}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$li,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$a,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_Page),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('1.122B'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html$text(' 公式リンク '),
															_1: {
																ctor: '::',
																_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/content/1122b-live-patch-notes'),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text(' (2016/12/5)'),
																	_1: {ctor: '[]'}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$li,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$a,
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix_Page),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('1.122B Hot Fix'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html$text(' 公式リンク '),
																_1: {
																	ctor: '::',
																	_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://www.darkageofcamelot.com/article/1122b-hot-fix'),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text(' (2016/12/7)'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$li,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$a,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix2_Page),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('1.122B Hot Fix #2'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html$text(' 公式リンク '),
																	_1: {
																		ctor: '::',
																		_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/article/1122b-hot-fix-2'),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text(' (2016/12/9)'),
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$a,
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix3_Page),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('1.122B Hot Fix #3'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _elm_lang$html$Html$text(' 公式リンク '),
																		_1: {
																			ctor: '::',
																			_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/article/1122b-hot-fix-3'),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html$text(' (2016/12/14)'),
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$a,
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$Patch_1_122B_HotFix4_Page),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('1.122B Hot Fix #4'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html$text(' 公式リンク '),
																			_1: {
																				ctor: '::',
																				_0: _Ragamuffine$daoc_patch_notes$Main$raw_link('http://darkageofcamelot.com/article/1122b-hot-fix-4'),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html$text(' (2016/12/20)'),
																					_1: {ctor: '[]'}
																				}
																			}
																		}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$h2,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('クラス'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('uk-grid'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-1-3 uk-row-first'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$ul,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('uk-nav uk-nav-side uk-width-medium-2-3'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$li,
															{ctor: '[]'},
															{
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$a,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$AlbionPage),
																		_1: {
																			ctor: '::',
																			_0: _elm_lang$html$Html_Attributes$style(
																				{
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 'color', _1: _Ragamuffine$daoc_patch_notes$Style$color_alb},
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	},
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html$text('アルビオン'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$a,
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ArmsmanPage),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('アームズマン'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$a,
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MercenaryPage),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('マーセナリー'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$a,
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$PaladinPage),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('パラディン'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$a,
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ReaverPage),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('リーバー'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$a,
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ClericPage),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('クレリック'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$a,
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$FriarPage),
																								_1: {ctor: '[]'}
																							},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('フライアー'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$a,
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HereticPage),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('ヘレティック'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$a,
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$WizardPage),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('ウィザード'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$a,
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$SorcererPage),
																											_1: {ctor: '[]'}
																										},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('ソーサラー'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$a,
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$TheurgistPage),
																												_1: {ctor: '[]'}
																											},
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('サージスト'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_elm_lang$html$Html$a,
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$CabalistPage),
																													_1: {ctor: '[]'}
																												},
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('カバリスト'),
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$a,
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$NecromancerPage),
																														_1: {ctor: '[]'}
																													},
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('ネクロマンサー'),
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_elm_lang$html$Html$a,
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$InfiltratorPage),
																															_1: {ctor: '[]'}
																														},
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('インフィルトレーター'),
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_elm_lang$html$Html$a,
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ScoutPage),
																																_1: {ctor: '[]'}
																															},
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('スカウト'),
																																_1: {ctor: '[]'}
																															}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_elm_lang$html$Html$a,
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MinstrelPage),
																																	_1: {ctor: '[]'}
																																},
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('ミンストレル'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-1-3'),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$ul,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('uk-nav uk-nav-side uk-width-medium-2-3'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$li,
																{ctor: '[]'},
																{
																	ctor: '::',
																	_0: A2(
																		_elm_lang$html$Html$a,
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MidgardPage),
																			_1: {
																				ctor: '::',
																				_0: _elm_lang$html$Html_Attributes$style(
																					{
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 'color', _1: _Ragamuffine$daoc_patch_notes$Style$color_mid},
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		},
																		{
																			ctor: '::',
																			_0: _elm_lang$html$Html$text('ミッドガルド'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$a,
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$WarriorPage),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('ウォリアー'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$a,
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ThanePage),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('セイン'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$a,
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$BerserkerPage),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('バーサーカー'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$a,
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$SkaldPage),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('スカルド'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$a,
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$SavagePage),
																								_1: {ctor: '[]'}
																							},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('サヴェジ'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$a,
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ValkyriePage),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('ヴァルキリー'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$a,
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HealerPage),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('ヒーラー'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$a,
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ShamanPage),
																											_1: {ctor: '[]'}
																										},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('シャーマン'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$a,
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$RunemasterPage),
																												_1: {ctor: '[]'}
																											},
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('ルーンマスター'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_elm_lang$html$Html$a,
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$SpiritmasterPage),
																													_1: {ctor: '[]'}
																												},
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('スピリットマスター'),
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$a,
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$BonedancerPage),
																														_1: {ctor: '[]'}
																													},
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('ボーンダンサー'),
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_elm_lang$html$Html$a,
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$WarlockPage),
																															_1: {ctor: '[]'}
																														},
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('ウォーロック'),
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_elm_lang$html$Html$a,
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ShadowbladePage),
																																_1: {ctor: '[]'}
																															},
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('シャドウブレード'),
																																_1: {ctor: '[]'}
																															}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_elm_lang$html$Html$a,
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HunterPage),
																																	_1: {ctor: '[]'}
																																},
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('ハンター'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {ctor: '[]'}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-1-3'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$ul,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$class('uk-nav uk-nav-side uk-width-medium-2-3'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$a,
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HiberniaPage),
																				_1: {
																					ctor: '::',
																					_0: _elm_lang$html$Html_Attributes$style(
																						{
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 'color', _1: _Ragamuffine$daoc_patch_notes$Style$color_hib},
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}
																			},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('ヒベルニア'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$a,
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$HeroPage),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('ヒーロー'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_elm_lang$html$Html$a,
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$BlademasterPage),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _elm_lang$html$Html$text('ブレードマスター'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_elm_lang$html$Html$a,
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ChampionPage),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _elm_lang$html$Html$text('チャンピオン'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_elm_lang$html$Html$a,
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$ValewalkerPage),
																								_1: {ctor: '[]'}
																							},
																							{
																								ctor: '::',
																								_0: _elm_lang$html$Html$text('ヴェールウォーカー'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_elm_lang$html$Html$a,
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$VampiirPage),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _elm_lang$html$Html$text('ヴァンピール'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_elm_lang$html$Html$a,
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$DruidPage),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _elm_lang$html$Html$text('ドルイド'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_elm_lang$html$Html$a,
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$BardPage),
																											_1: {ctor: '[]'}
																										},
																										{
																											ctor: '::',
																											_0: _elm_lang$html$Html$text('バード'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$html$Html$a,
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$WardenPage),
																												_1: {ctor: '[]'}
																											},
																											{
																												ctor: '::',
																												_0: _elm_lang$html$Html$text('ウォーデン'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {
																											ctor: '::',
																											_0: A2(
																												_elm_lang$html$Html$a,
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$EldritchPage),
																													_1: {ctor: '[]'}
																												},
																												{
																													ctor: '::',
																													_0: _elm_lang$html$Html$text('エルドリッチ'),
																													_1: {ctor: '[]'}
																												}),
																											_1: {
																												ctor: '::',
																												_0: A2(
																													_elm_lang$html$Html$a,
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$EnchanterPage),
																														_1: {ctor: '[]'}
																													},
																													{
																														ctor: '::',
																														_0: _elm_lang$html$Html$text('エンチャンター'),
																														_1: {ctor: '[]'}
																													}),
																												_1: {
																													ctor: '::',
																													_0: A2(
																														_elm_lang$html$Html$a,
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MentalistPage),
																															_1: {ctor: '[]'}
																														},
																														{
																															ctor: '::',
																															_0: _elm_lang$html$Html$text('メンタリスト'),
																															_1: {ctor: '[]'}
																														}),
																													_1: {
																														ctor: '::',
																														_0: A2(
																															_elm_lang$html$Html$a,
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$AnimistPage),
																																_1: {ctor: '[]'}
																															},
																															{
																																ctor: '::',
																																_0: _elm_lang$html$Html$text('アニミスト'),
																																_1: {ctor: '[]'}
																															}),
																														_1: {
																															ctor: '::',
																															_0: A2(
																																_elm_lang$html$Html$a,
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$BainsheePage),
																																	_1: {ctor: '[]'}
																																},
																																{
																																	ctor: '::',
																																	_0: _elm_lang$html$Html$text('バンシー'),
																																	_1: {ctor: '[]'}
																																}),
																															_1: {
																																ctor: '::',
																																_0: A2(
																																	_elm_lang$html$Html$a,
																																	{
																																		ctor: '::',
																																		_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$NightshadePage),
																																		_1: {ctor: '[]'}
																																	},
																																	{
																																		ctor: '::',
																																		_0: _elm_lang$html$Html$text('ナイトシェード'),
																																		_1: {ctor: '[]'}
																																	}),
																																_1: {
																																	ctor: '::',
																																	_0: A2(
																																		_elm_lang$html$Html$a,
																																		{
																																			ctor: '::',
																																			_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$RangerPage),
																																			_1: {ctor: '[]'}
																																		},
																																		{
																																			ctor: '::',
																																			_0: _elm_lang$html$Html$text('レンジャー'),
																																			_1: {ctor: '[]'}
																																		}),
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('uk-grid'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-1-3 uk-row-first'),
													_1: {ctor: '[]'}
												},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('uk-width-medium-1-3'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$ul,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$class('uk-nav uk-nav-side uk-width-medium-2-3'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$li,
																	{ctor: '[]'},
																	{
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$a,
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html_Attributes$style(
																					{
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 'color', _1: _Ragamuffine$daoc_patch_notes$Style$color_common},
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _elm_lang$html$Html$text('共通'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_elm_lang$html$Html$a,
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html_Events$onClick(_Ragamuffine$daoc_patch_notes$Message$MaulerPage),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _elm_lang$html$Html$text('モーラー'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {ctor: '[]'}
		}
	});
var _Ragamuffine$daoc_patch_notes$Main$albion_page = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$make_content(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Armsman$all,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Cabalist$all,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Cleric$all,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Friar$all,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Heretic$all,
									A2(
										_elm_lang$core$Basics_ops['++'],
										_Ragamuffine$daoc_patch_notes$Infiltrator$all,
										A2(
											_elm_lang$core$Basics_ops['++'],
											_Ragamuffine$daoc_patch_notes$Mauler$all,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_Ragamuffine$daoc_patch_notes$Mercenary$all,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_Ragamuffine$daoc_patch_notes$Minstrel$all,
													A2(
														_elm_lang$core$Basics_ops['++'],
														_Ragamuffine$daoc_patch_notes$Necromancer$all,
														A2(
															_elm_lang$core$Basics_ops['++'],
															_Ragamuffine$daoc_patch_notes$Paladin$all,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_Ragamuffine$daoc_patch_notes$Scout$all,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_Ragamuffine$daoc_patch_notes$Reaver$all,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_Ragamuffine$daoc_patch_notes$Sorcerer$all,
																		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Theurgist$all, _Ragamuffine$daoc_patch_notes$Wizard$all)))))))))))))))),
			_1: {ctor: '[]'}
		}
	});
var _Ragamuffine$daoc_patch_notes$Main$midgard_page = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$make_content(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Berserker$all,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Bonedancer$all,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Healer$all,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Hunter$all,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Mauler$all,
									A2(
										_elm_lang$core$Basics_ops['++'],
										_Ragamuffine$daoc_patch_notes$Runemaster$all,
										A2(
											_elm_lang$core$Basics_ops['++'],
											_Ragamuffine$daoc_patch_notes$Savage$all,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_Ragamuffine$daoc_patch_notes$Shadowblade$all,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_Ragamuffine$daoc_patch_notes$Shaman$all,
													A2(
														_elm_lang$core$Basics_ops['++'],
														_Ragamuffine$daoc_patch_notes$Skald$all,
														A2(
															_elm_lang$core$Basics_ops['++'],
															_Ragamuffine$daoc_patch_notes$Spiritmaster$all,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_Ragamuffine$daoc_patch_notes$Thane$all,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_Ragamuffine$daoc_patch_notes$Valkyrie$all,
																	A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Warlock$all, _Ragamuffine$daoc_patch_notes$Warrior$all))))))))))))))),
			_1: {ctor: '[]'}
		}
	});
var _Ragamuffine$daoc_patch_notes$Main$hibernia_page = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
		_1: {
			ctor: '::',
			_0: _Ragamuffine$daoc_patch_notes$Style$make_content(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_Ragamuffine$daoc_patch_notes$Animist$all,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_Ragamuffine$daoc_patch_notes$Bainshee$all,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_Ragamuffine$daoc_patch_notes$Bard$all,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_Ragamuffine$daoc_patch_notes$Blademaster$all,
								A2(
									_elm_lang$core$Basics_ops['++'],
									_Ragamuffine$daoc_patch_notes$Champion$all,
									A2(
										_elm_lang$core$Basics_ops['++'],
										_Ragamuffine$daoc_patch_notes$Druid$all,
										A2(
											_elm_lang$core$Basics_ops['++'],
											_Ragamuffine$daoc_patch_notes$Eldritch$all,
											A2(
												_elm_lang$core$Basics_ops['++'],
												_Ragamuffine$daoc_patch_notes$Enchanter$all,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_Ragamuffine$daoc_patch_notes$Hero$all,
													A2(
														_elm_lang$core$Basics_ops['++'],
														_Ragamuffine$daoc_patch_notes$Mauler$all,
														A2(
															_elm_lang$core$Basics_ops['++'],
															_Ragamuffine$daoc_patch_notes$Mentalist$all,
															A2(
																_elm_lang$core$Basics_ops['++'],
																_Ragamuffine$daoc_patch_notes$Nightshade$all,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_Ragamuffine$daoc_patch_notes$Ranger$all,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_Ragamuffine$daoc_patch_notes$Valewalker$all,
																		A2(_elm_lang$core$Basics_ops['++'], _Ragamuffine$daoc_patch_notes$Vampiir$all, _Ragamuffine$daoc_patch_notes$Warden$all)))))))))))))))),
			_1: {ctor: '[]'}
		}
	});
var _Ragamuffine$daoc_patch_notes$Main$view = function (model) {
	var _p0 = model;
	switch (_p0.ctor) {
		case 'TopPage':
			return _Ragamuffine$daoc_patch_notes$Main$top_page;
		case 'Patch_1_121_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_121B_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121B),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_121C_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_121$patch_1_121C),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_122B_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_122B_HotFix_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_122B_HotFix2_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix2),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_122B_HotFix3_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix3),
						_1: {ctor: '[]'}
					}
				});
		case 'Patch_1_122B_HotFix4_Page':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Patch1_122$patch_1_122B_HotFix4),
						_1: {ctor: '[]'}
					}
				});
		case 'AlbionPage':
			return _Ragamuffine$daoc_patch_notes$Main$albion_page;
		case 'MidgardPage':
			return _Ragamuffine$daoc_patch_notes$Main$midgard_page;
		case 'HiberniaPage':
			return _Ragamuffine$daoc_patch_notes$Main$hibernia_page;
		case 'AnimistPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Animist$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ArmsmanPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Armsman$all),
						_1: {ctor: '[]'}
					}
				});
		case 'BainsheePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Bainshee$all),
						_1: {ctor: '[]'}
					}
				});
		case 'BardPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Bard$all),
						_1: {ctor: '[]'}
					}
				});
		case 'BerserkerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Berserker$all),
						_1: {ctor: '[]'}
					}
				});
		case 'BlademasterPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Blademaster$all),
						_1: {ctor: '[]'}
					}
				});
		case 'BonedancerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Bonedancer$all),
						_1: {ctor: '[]'}
					}
				});
		case 'CabalistPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Cabalist$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ChampionPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Champion$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ClericPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Cleric$all),
						_1: {ctor: '[]'}
					}
				});
		case 'DruidPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Druid$all),
						_1: {ctor: '[]'}
					}
				});
		case 'EldritchPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Eldritch$all),
						_1: {ctor: '[]'}
					}
				});
		case 'EnchanterPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Enchanter$all),
						_1: {ctor: '[]'}
					}
				});
		case 'FriarPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Friar$all),
						_1: {ctor: '[]'}
					}
				});
		case 'HealerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Healer$all),
						_1: {ctor: '[]'}
					}
				});
		case 'HereticPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Heretic$all),
						_1: {ctor: '[]'}
					}
				});
		case 'HeroPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Hero$all),
						_1: {ctor: '[]'}
					}
				});
		case 'HunterPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Hunter$all),
						_1: {ctor: '[]'}
					}
				});
		case 'InfiltratorPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Infiltrator$all),
						_1: {ctor: '[]'}
					}
				});
		case 'MaulerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Mauler$all),
						_1: {ctor: '[]'}
					}
				});
		case 'MentalistPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Mentalist$all),
						_1: {ctor: '[]'}
					}
				});
		case 'MercenaryPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Mercenary$all),
						_1: {ctor: '[]'}
					}
				});
		case 'MinstrelPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Minstrel$all),
						_1: {ctor: '[]'}
					}
				});
		case 'NecromancerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Necromancer$all),
						_1: {ctor: '[]'}
					}
				});
		case 'NightshadePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Nightshade$all),
						_1: {ctor: '[]'}
					}
				});
		case 'PaladinPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Paladin$all),
						_1: {ctor: '[]'}
					}
				});
		case 'RangerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Ranger$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ReaverPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Reaver$all),
						_1: {ctor: '[]'}
					}
				});
		case 'RunemasterPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Runemaster$all),
						_1: {ctor: '[]'}
					}
				});
		case 'SavagePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Savage$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ScoutPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Scout$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ShadowbladePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Shadowblade$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ShamanPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Shaman$all),
						_1: {ctor: '[]'}
					}
				});
		case 'SkaldPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Skald$all),
						_1: {ctor: '[]'}
					}
				});
		case 'SorcererPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Sorcerer$all),
						_1: {ctor: '[]'}
					}
				});
		case 'SpiritmasterPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Spiritmaster$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ThanePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Thane$all),
						_1: {ctor: '[]'}
					}
				});
		case 'TheurgistPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Theurgist$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ValewalkerPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Valewalker$all),
						_1: {ctor: '[]'}
					}
				});
		case 'ValkyriePage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Valkyrie$all),
						_1: {ctor: '[]'}
					}
				});
		case 'VampiirPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Vampiir$all),
						_1: {ctor: '[]'}
					}
				});
		case 'WardenPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Warden$all),
						_1: {ctor: '[]'}
					}
				});
		case 'WarlockPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Warlock$all),
						_1: {ctor: '[]'}
					}
				});
		case 'WarriorPage':
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Warrior$all),
						_1: {ctor: '[]'}
					}
				});
		default:
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _Ragamuffine$daoc_patch_notes$Main$top_menu,
					_1: {
						ctor: '::',
						_0: _Ragamuffine$daoc_patch_notes$Style$make_content(_Ragamuffine$daoc_patch_notes$Wizard$all),
						_1: {ctor: '[]'}
					}
				});
	}
};
var _Ragamuffine$daoc_patch_notes$Main$init = {ctor: '_Tuple2', _0: _Ragamuffine$daoc_patch_notes$Message$TopPage, _1: _elm_lang$core$Platform_Cmd$none};
var _Ragamuffine$daoc_patch_notes$Main$main = _elm_lang$html$Html$program(
	{init: _Ragamuffine$daoc_patch_notes$Main$init, view: _Ragamuffine$daoc_patch_notes$Main$view, update: _Ragamuffine$daoc_patch_notes$Main$update, subscriptions: _Ragamuffine$daoc_patch_notes$Main$subscriptions})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _Ragamuffine$daoc_patch_notes$Main$main !== 'undefined') {
    _Ragamuffine$daoc_patch_notes$Main$main(Elm['Main'], 'Main', undefined);
}
Elm['Message'] = Elm['Message'] || {};
if (typeof _Ragamuffine$daoc_patch_notes$Message$main !== 'undefined') {
    _Ragamuffine$daoc_patch_notes$Message$main(Elm['Message'], 'Message', undefined);
}
Elm['Style'] = Elm['Style'] || {};
if (typeof _Ragamuffine$daoc_patch_notes$Style$main !== 'undefined') {
    _Ragamuffine$daoc_patch_notes$Style$main(Elm['Style'], 'Style', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

