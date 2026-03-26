
export default {
	"`":		{ scancode: 0x29 },
	"\\": { scancode: 0x2B },
	"{backspace}":		{ scancode: 0x0E }, 
	"[":		{ scancode: 0x1A },
	"]":		{ scancode: 0x1B },
	",":		{ scancode: 0x33 },
	"1":		{ scancode: 0x02 },
	"2":		{ scancode: 0x03 },
	"3":		{ scancode: 0x04 },
	"4":		{ scancode: 0x05 },
	"5":		{ scancode: 0x06 },
	"6":		{ scancode: 0x07 },
	"7":		{ scancode: 0x08 },
	"8":		{ scancode: 0x09 },
	"9":		{ scancode: 0x0A },
	"0":		{ scancode: 0x0B },
	"=":		{ scancode: 0x0D },
//	"IntlBackslash":
//	"IntlHash":
	"IntlRo": 		{ scancode:0x73 }, //Japanese
	"IntlYen": 		{ scancode:0x84 }, //Japanese
	"a":			{ scancode: 0x1E },
	"b":			{ scancode: 0x30 },
	"c":			{ scancode: 0x2E },
	"d":			{ scancode: 0x20 },
	"e":			{ scancode: 0x12 },
	"f":			{ scancode: 0x21 },
	"g":			{ scancode: 0x22 },
	"h":			{ scancode: 0x23 },
	"i":			{ scancode: 0x17 },
	"j":			{ scancode: 0x24 },
	"k":			{ scancode: 0x25 },
	"l":			{ scancode: 0x26 },
	"m":			{ scancode: 0x32 },
	"n":			{ scancode: 0x31 },
	"o":			{ scancode: 0x18 },
	"p":			{ scancode: 0x19 },
	"q":			{ scancode: 0x10 },
	"r":			{ scancode: 0x13 },
	"s":			{ scancode: 0x1F },
	"t":			{ scancode: 0x14 },
	"u":			{ scancode: 0x16 },
	"v":			{ scancode: 0x2F },
	"w":			{ scancode: 0x11 },
	"x":			{ scancode: 0x2D },
	"y":			{ scancode: 0x15 },
    "z":			{ scancode: 0x2C },
	"-":		{ scancode: 0x0C },
	".":		{ scancode: 0x34 },
	"'":		{ scancode: 0x28 },
	";":	{ scancode: 0x27 },
	"/":		{ scancode: 0x35 },

	"{altleft}":		{ scancode: 0x38 },
	"{altright}":		{ scancode: 0x138 },
	"{capslock}":		{ scancode: 0x3A, is_lock: true },
//	"ContextMenu":
	"{controlleft}":	{ scancode: 0x1D },
	"{controlright}":	{ scancode: 0x11D },
	"{enter}":		{ scancode: 0x1C },
	"{metaleft}":		{ scancode: 0x15B },
	"{metaright}":		{ scancode: 0x15C },
	"{shift}":	    { scancode: 0x2A },
	"{shiftleft}":	{ scancode: 0x2A },
	"{shiftright}":	{ scancode: 0x36 },
	"{space}":		{ scancode: 0x39 },
	"{tab}":			{ scancode: 0x0F },
	"IntlBackslash":{ scancode: 0x56 },//swiss german fix <
	"Convert": 		{ scancode:0x79 }, //Japanese
	"KanaMode":   	{ scancode:0x72 }, //Japanese
//	"Lang1":
//	"Lang2":
//	"Lang3":
//	"Lang4":
//	"Lang5":
	"NonConvert":	{ scancode:0x7B }, //Japanese
	

	"{delete}":		{ scancode: 0x153 },
	"{end}":			{ scancode: 0x14F },
//	"Help":
	"{home}":			{ scancode: 0x147 },
	"{insert}":		{ scancode: 0x152 },
	"{pagedown}":		{ scancode: 0x151 },
	"{pageup}":		{ scancode: 0x149 },

	"{arrowdown}":	{ scancode: 0x150 },
	"{arrowleft}":	{ scancode: 0x14B },
	"{arrowright}":	{ scancode: 0x14D },
	"{arrowup}":		{ scancode: 0x148 },

	"{numlock}":		{ scancode: 0x45, is_lock: true },
	"{numpad0}":		{ scancode: 0x52 },
	"{numpad1}":		{ scancode: 0x4F },
	"{numpad2}":		{ scancode: 0x50 },
	"{numpad3}":		{ scancode: 0x51 },
	"{numpad4}":		{ scancode: 0x4B },
	"{numpad5}":		{ scancode: 0x4C },
	"{numpad6}":		{ scancode: 0x4D },
	"{numpad7}":		{ scancode: 0x47 },
	"{numpad8}":		{ scancode: 0x48 },
	"{numpad9}":		{ scancode: 0x49 },
	"{numpadadd}":	{ scancode: 0x4E },
//	"NumpadBackspace":
//	"NumpadClear":
//	"NumpadClearEntry":
//	"NumpadComma":
	"{numpaddecimal}":{ scancode: 0x53 },
	"{numpaddivide}":	{ scancode: 0x135 },
	"{numpadenter}":	{ scancode: 0x11C },
//	"NumpadEqual":
//	"NumpadMemoryAdd":
//	"NumpadMemoryClear":
//	"NumpadMemoryRecall":
//	"NumpadMemoryStore":
//	"NumpadMemorySubtract":
	"{numpadmultiply}":{ scancode: 0x37 },
//	"NumpadParenLeft":
//	"NumpadParenRight":
	"{numpadsubtract}":{ scancode: 0x4A },

	"{escape}":		{ scancode: 0x01 },
	"{f1}":			{ scancode: 0x3B },
	"{f2}":			{ scancode: 0x3C },
	"{f3}":			{ scancode: 0x3D },
	"{f4}":			{ scancode: 0x3E },
	"{f5}":			{ scancode: 0x3F },
	"{f6}":			{ scancode: 0x40 },
	"{f7}":			{ scancode: 0x41 },
	"{f8}":			{ scancode: 0x42 },
	"{f9}":			{ scancode: 0x43 },
	"{f10}":			{ scancode: 0x44 },
	"{f11}":			{ scancode: 0x57 },
	"{f12}":			{ scancode: 0x58 },
//	"Fn":
//	"FLock":
//	"PrintScreen":
	"{scrolllock}": { scancode: 0x46 }
//	"Pause":

//	Extra Keys
}


