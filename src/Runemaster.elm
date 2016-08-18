module Runemaster exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ルーンマスター 1.121"],
     text "ルーンマスターはフルリスペックされる。",
     secmid "Suppression (スペック)",
     text "AoE root の射程は増加する。",
     ulist ["Level 30 - 1655 range",
            "Level 39 - 1765 range",
            "Level 49 - 1875 range"],
     text "Level 26, 36, 46 の pulsing bladeturn は最上位のスペルのみスペルリストに載る。",
     secmid "Runecarving (スペック)",
     text "新しい single target energy DD が追加される。",
     ulist ["Level 6 - Mark of Thunder - 43 energy damage - 2.8s cast - 1500 range - 6 power",
            "Level 16 - Insignia of Thunder - 86 energy damage - 2.8s cast - 1500 range - 12 power",
            "Level 26 - Seal of Thunder - 133 energy damage - 2.8s cast - 1500 range - 17 power",
            "Level 36 - Signet of Thunder - 163 energy damage - 2.8s cast - 1500 range - 22 power",
            "Level 46 - Rune of Thunder - 209 energy damage - 2.8s cast - 1500 range - 29 power"],
     text "いくつかのスペルのレベルが変更になる",
     ulist ["Mark of Ruin (GTAoE) は 19 からレベル 11 へ",
            "Mark of Havoc (GTAoE) はレベル 26 から 21 へ",
            "Mark of Devastation (GTAoE) は 36 から 31 へ",
            "Mark of Undoing (GTAoE) は 43 から 41 へ",
            "Moved Vex of Earth はレベル 46 から 44 へ",
            "Moved Odin's Hatred はレベル 44 から 43 へ",
            "Moved Lesser Sigil of Havoc (bolt) はレベル 6 から 8 へ"]]
