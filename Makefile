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
	src/Warlock.elm src/Warrior.elm src/Wizard.elm

TARGET_ELM = target/main.js

SRC_HTML = src/index.html
TARGET_HTML = target/index.html

all: $(TARGET_ELM) $(TARGET_HTML)

$(TARGET_ELM): $(SRC_ELM) $(SRC_ELM_CLASS) target
	elm make $(SRC_ELM) --output $(TARGET_ELM)

$(TARGET_HTML) : $(SRC_HTML) target target/uikit.min.css
	cp $(SRC_HTML) $(TARGET_HTML)

target/uikit.min.css: src/css/uikit.min.css target
	cp src/css/uikit.min.css target/uikit.min.css

target:
	mkdir target
