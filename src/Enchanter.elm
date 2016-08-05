module Enchanter exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "エンチャンター 1.121"],
     text "エンチャンターはフルリスペックされる。",
     sechib "Mana Magic (スペック)",
     text "新しい single target instant haste debuff が追加される。",
     ulist ["Level 5 - Distracting Scintillation - Instant cast - 1500 range - 45秒間継続 - 5 power - 攻撃速度低下 14%.",
            "Level 17 - Blinding Scintillation - Instant cast - 1500 range - 45秒間継続 - 12 power - 攻撃速度低下 22%.",
            "Level 25 - Disturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 17 power - 攻撃速度低下 24%.",
            "Level 37 - Perturbing Scintillation - Instant cast - 1500 range - 45秒間継続 - 23 power - 攻撃速度低下 31%.",
            "Level 48 - Agitating Scintillation - Instant cast - 1500 range - 45秒間継続 - 31 power - 攻撃速度低下 38%."],
     sechib "Light Magic (スペック)",
     text "single target instant haste debuff は Mana Magic に移される。instant AoE haste debuff は残る。"]
