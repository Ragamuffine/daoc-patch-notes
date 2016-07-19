module Main exposing (..)

import Html exposing (Html, div, text, article, hr, a, nav, ul, li, h2)
import Html.App
import Html.Attributes exposing (class, style, href)
import Html.Events exposing (onClick)
import Message exposing (Message)
import Animist
import Armsman
import Bonedancer
import Cabalist
import Cleric
import Friar
import Minstrel
import Necromancer
import Sorcerer
import Wizard

-- MODEL

type alias Model = String

init : ( Model, Cmd Message )
init = ( "Hello, World!", Cmd.none )

-- VIEW

view : Model -> Html Message
view model =
    div []
    [
    nav [class "uk-navbar"]
        [ul [class "uk-navbar-nav"]
            [li [] [a [onClick Message.NoOp] [text "DAoC Patch Notes"]],
             li [] [a [onClick Message.NoOp] [text "menu A"]],
             li [] [a [onClick Message.NoOp] [text "menu B"]]]
         ],
    div [class "uk-width-medium-5-6", style [( "margin-top", "40px" ), ( "margin-left", "auto" ), ( "margin-right", "auto" )]]
        [h2 [] [text "パッチ"],
         ul []
             [li [] [a [] [text "1.121"]],
              li [] [a [] [text "1.121B"]],
              li [] [a [] [text "1.121C"]]],
         h2 [] [text "クラス"],
         div [class "uk-grid"]
             [
              div [class "uk-width-medium-1-3 uk-row-first"]
                  [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                       [li [] [a [] [text "A"],
                               a [] [text "B"]]]],
              div [class "uk-width-medium-1-3"]
                  [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                       [li [] [a [] [text "C"],
                               a [] [text "D"]]]],
              div [class "uk-width-medium-1-3"]
                  [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                       [li [] [a [] [text "E"],
                               a [] [text "F"]]]]
             ],

         article [class "uk-article"]
             [text model,
              hr [] [],
              div [] Animist.patch_1_121,
              hr [] [],
              div [] Armsman.patch_1_121,
              hr [] [],
              div [] Bonedancer.patch_1_121,
              hr [] [],
              div [] Cabalist.patch_1_121,
              hr [] [],
              div [] Cleric.patch_1_121,
              hr [] [],
              div [] Friar.patch_1_121,
              hr [] [],
              div [] Minstrel.patch_1_121,
              hr [] [],
              div [] Necromancer.patch_1_121,
              hr [] [],
              div [] Sorcerer.patch_1_121,
              hr [] [],
              div [] Wizard.patch_1_121,
              hr [] [],
              a [href "http://darkageofcamelot.com/content/1121-pendragon-patch-notes"] [text "http://darkageofcamelot.com/content/1121-pendragon-patch-notes"]
             ]]
    ]

-- UPDATE

update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        Message.NoOp -> ( "click", Cmd.none )

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Message
subscriptions model =
    Sub.none

-- MAIN

main : Program Never
main =
    Html.App.program { init = init,
                       view = view,
                       update = update,
                       subscriptions = subscriptions }
