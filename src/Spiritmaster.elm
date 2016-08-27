module Spiritmaster exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "スピリットマスター 1.121"],
     text "スピリットマスターはフルリスペックされる。",
     secmid "Suppression (スペック)",
     text "single target mez が変更される。",
     ulist ["Level 24 mez の時間は40秒に短縮される。",
            "Level 31 mez の時間は50秒に短縮される。",
            "Level 40 mez の時間は60秒に短縮される。",
            "Level 50 mez, Unmake Mind, は削除される。"]]


all : List (Html Message)
all = patch_1_121
