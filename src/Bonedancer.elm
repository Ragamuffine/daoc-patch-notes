module Bonedancer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ボーンダンサー 1.121"],
     text "ボーンダンサーはフルリスペックされる。",
     secmid "Bone Army (基本)",
     text "新しい level 40 Skeletal Commander が追加される。Charge 能力を持つ。他のすべての Skeletal Commander は除去される。",
     secmid "Suppression (スペック)",
     text "fossil guardian が cast する Shards of Bone damage-shield buff は除去される。",
     br [] [],
     text "新しいペット fossil conjurer が追加される。levels 34 と 44 の spirit の DD スペルで攻撃を行う。",
     br [] [],
     text "single-target ABS buff は除去される。",
     secmid "Bone Army (スペック)",
     text "level 40 の Bone Army archer commander は level 50 に変更になる。",
     ulist ["commander は Bone Army General と呼ばれ level 50 から見て黄色になる。",
            "commander は最大 4 ではなく 6 のペットをサポートできる。",
            "commander はペットにアシストさせることもアシストさせないこともできる。"],
     text "いくつかの能力のレベルが変更になる。",
     ulist ["Damage Add は level 48 から 50 になる。",
            "Fossil Warrior sub-pet は level 48 から 46 になる。",
            "Taunt は level 46 から 43 になる。",
            "Str/Con buff は level 43 から 40 になる。"],
     text "すべての Bone Army melee pet は Charge 能力を失う。",
     br [] [],
     text "endurance/power drain totem の効果は 10% power / 25% endurance から 20% power / 50% endurance に増加する。この能力はターゲットの現在の power/endurance を吸収する。最大値ではない。"]
