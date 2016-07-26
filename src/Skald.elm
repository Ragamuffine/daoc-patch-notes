module Skald exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "スカルド 1.121"],
     text "スカルドはフルリスペックされる。"]
