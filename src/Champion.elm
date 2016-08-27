module Champion exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "チャンピオン 1.121"],
     text "チャンピオンはフルリスペックされる。",
     text "RR5 Badge of Valor の再使用タイマーは15分から10分になる。",
     sechib "Valor (スペック)",
     text "DD shout の属性は body から energy になる。",
     text "Dex/Qui debuff は自分を対象とした 20 秒間続く magic resistance buff を同時に唱える。",
     text "Str/Con debuff は同時に対象の現在および次回の bladeturn を除去する。",
     text "Haste debuff は自分のクリティカル率を20秒間3%増加させる。",
     text "Acuity debuff は自分の power を回復させる。",
     br [] [],
     text "新しい魔法が追加される。この魔法は以下の2つの魔法を同時に唱える。",
     ulist ["Level 50 - Champion's Call - 味方のダメージ属性を energy に変える - 600 半径 - 30秒間継続 - melee/archery damage のみ対象 - 再使用10分",
            "Level 50 - Call of the Champion - 30秒間継続 - 再使用10分 - 100%の確率で30% energy resistance debuff を行う offensive proc - 自分のみ対象"],
     sechib "Large Weaponry (スペック)",
     ulist ["Level 15 – Domination – Side – ダメージ増加",
            "Level 34 - Demolish - Anytime - ダメージ減少",
            "Level 39 – Shatter – Hibernian Force – ダメージ増加",
            "Level 50 - Annihilation - Rear - ダメージ増加"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "チャンピオン 1.121B"],
     text "Level 47 二次レジストバフ Against the Odds はそれよりも長時間有効なアイテムによるレジストバフを上書きしなくなる。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
