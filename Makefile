SRC_ELM = src/Main.elm src/Message.elm src/Style.elm 

SRC_ELM_CLASS = src/Animist.elm src/Armsman.elm src/Bainshee.elm src/Bard.elm \
	src/Berserker.elm src/Blademaster.elm src/Bonedancer.elm \
	src/Cabalist.elm src/Champion.elm src/Cleric.elm src/Druid.elm \
	src/Eldritch.elm src/Enchanter.elm src/Friar.elm src/Healer.elm \
	src/Heretic.elm src/Hero.elm src/Hunter.elm src/Infiltrator.elm \
	src/Mauler.elm src/Mentalist.elm src/Mercenary.elm src/Minstrel.elm \
	src/Necromancer.elm src/Nightshade.elm src/Paladin.elm src/Ranger.elm \
	src/Reaver.elm src/Runemaster.elm src/Savage.elm src/Scout.elm \
	src/Shadowblade.elm src/Shaman.elm src/Skald.elm src/Sorcerer.elm \
	src/Spiritmaster.elm src/Thane.elm src/Theurgist.elm \
	src/Valewalker.elm src/Valkyrie.elm src/Vampiir.elm src/Warden.elm \
	src/Warlock.elm src/Warrior.elm src/Wizard.elm \
	src/Patch1_121.elm

SRC_HTML = src/index.html

SRC_FONTS = src/fonts/FontAwesome.otf src/fonts/fontawesome-webfont.woff \
	src/fonts/fontawesome-webfont.ttf src/fonts/fontawesome-webfont.woff2

TARGET_ELM = docs/main.js

TARGET_JS = docs/main.min.js

TARGET_HTML = docs/index.html

TARGET_FONTS = docs/fonts/FontAwesome.otf docs/fonts/fontawesome-webfont.woff \
	docs/fonts/fontawesome-webfont.ttf docs/fonts/fontawesome-webfont.woff2

all: $(TARGET_JS) $(TARGET_HTML) $(TARGET_FONTS)

$(TARGET_JS): $(TARGET_ELM)
	node_modules/.bin/uglifyjs -c -m -o docs/main.min.js docs/main.js

$(TARGET_ELM): $(SRC_ELM) $(SRC_ELM_CLASS)
	elm make $(SRC_ELM) --output $(TARGET_ELM)

$(TARGET_HTML) : $(SRC_HTML) docs/css/uikit.min.css docs/css/main.css
	cp $(SRC_HTML) $(TARGET_HTML)

docs/css/uikit.min.css: src/css/uikit.min.css docs/css
	cp src/css/uikit.min.css docs/css/uikit.min.css

docs/css/main.css: src/css/main.css docs/css
	cp src/css/main.css docs/css/main.css

docs/css:
	mkdir -p docs/css

docs/fonts:
	mkdir -p docs/fonts

docs/fonts/FontAwesome.otf: src/fonts/FontAwesome.otf docs/fonts
	cp src/fonts/FontAwesome.otf docs/fonts/FontAwesome.otf

docs/fonts/fontawesome-webfont.woff: src/fonts/fontawesome-webfont.woff docs/fonts
	cp src/fonts/fontawesome-webfont.woff docs/fonts/fontawesome-webfont.woff

docs/fonts/fontawesome-webfont.ttf: src/fonts/fontawesome-webfont.ttf docs/fonts
	cp src/fonts/fontawesome-webfont.ttf docs/fonts/fontawesome-webfont.ttf

docs/fonts/fontawesome-webfont.woff2: src/fonts/fontawesome-webfont.woff2 docs/fonts
	cp src/fonts/fontawesome-webfont.woff2 docs/fonts/fontawesome-webfont.woff2
