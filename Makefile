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

TARGET_ELM = target/main.js

TARGET_HTML = target/index.html

TARGET_FONTS = target/fonts/FontAwesome.otf target/fonts/fontawesome-webfont.woff \
	target/fonts/fontawesome-webfont.ttf target/fonts/fontawesome-webfont.woff2

all: $(TARGET_ELM) $(TARGET_HTML) $(TARGET_FONTS)

$(TARGET_ELM): $(SRC_ELM) $(SRC_ELM_CLASS) target
	elm make $(SRC_ELM) --output $(TARGET_ELM)

$(TARGET_HTML) : $(SRC_HTML) target target/css/uikit.min.css target/css/main.css
	cp $(SRC_HTML) $(TARGET_HTML)

target/css/uikit.min.css: src/css/uikit.min.css target/css
	cp src/css/uikit.min.css target/css/uikit.min.css

target/css/main.css: src/css/main.css target/css
	cp src/css/main.css target/css/main.css

target/css:
	mkdir -p target/css

target/fonts:
	mkdir -p target/fonts

target/fonts/FontAwesome.otf: src/fonts/FontAwesome.otf target/fonts
	cp src/fonts/FontAwesome.otf target/fonts/FontAwesome.otf

target/fonts/fontawesome-webfont.woff: src/fonts/fontawesome-webfont.woff target/fonts
	cp src/fonts/fontawesome-webfont.woff target/fonts/fontawesome-webfont.woff

target/fonts/fontawesome-webfont.ttf: src/fonts/fontawesome-webfont.ttf target/fonts
	cp src/fonts/fontawesome-webfont.ttf target/fonts/fontawesome-webfont.ttf

target/fonts/fontawesome-webfont.woff2: src/fonts/fontawesome-webfont.woff2 target/fonts
	cp src/fonts/fontawesome-webfont.woff2 target/fonts/fontawesome-webfont.woff2
