SRC_ELM = src/Main.elm src/Message.elm src/Style.elm src/Armsman.elm \
	src/Cabalist.elm
TARGET_ELM = target/main.js

SRC_HTML = src/index.html
TARGET_HTML = target/index.html

all: $(TARGET_ELM) $(TARGET_HTML)

$(TARGET_ELM): $(SRC_ELM) target
	elm make $(SRC_ELM) --output $(TARGET_ELM)

$(TARGET_HTML) : $(SRC_HTML) target target/uikit.min.css
	cp $(SRC_HTML) $(TARGET_HTML)

target/uikit.min.css: src/css/uikit.min.css target
	cp src/css/uikit.min.css target/uikit.min.css

target:
	mkdir target
