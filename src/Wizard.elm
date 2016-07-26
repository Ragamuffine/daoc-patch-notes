module Wizard exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウィザード 1.121"],
     text "ウィザードはフルリスペックされる。",
     secalb "Fire Magic (基本)",
     text "新しい自分を対象にした grapple を追加",
     ulist ["Level 45 - Flame Cocoon - Instant cast - 再使用5分 - 7秒間継続 - melee 攻撃を防ぎ、1.5秒ごとに200HP回復する。この間 silence 状態で移動はできない。grapple はいつでも解除できるが silence 状態は継続される。"],
     secalb "Cold Magic (スペック)",
     text "新しい自分を対象にした grapple を追加",
     ulist ["Level 44 - Ice Grip - 3s cast - 1500 range - 再使用5分 - 6秒間継続 - すべての攻撃を防ぐが移動できない。自分から melee 攻撃することはできる。"]]
 
