module Necromancer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ネクロマンサー 1.121"],
     text "ネクロマンサーはフルリスペックされる。",
     secalb "Death Servant (スペック)",
     text "新しい shade-cast PBAoE スペルを追加",
     ulist ["Level 47 - Necrotic Conduit - 225 damage, 350 半径 PBAoE - 20% power cost - 3s shade-cast, pet instant-cast - shade は pet から 250 以内でなければならない"],
     text "これまでの level 47 PBAoE スペル, Channeled Frenzy, は level 46 になる。"]
