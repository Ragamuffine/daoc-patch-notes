module Main exposing (..)

import Html exposing (Html, div, text, article, hr)
import Html.App
import Html.Attributes exposing (class, style)
import Message exposing (Message)
import Armsman
import Cabalist

-- MODEL

type alias Model = String

init : ( Model, Cmd Message )
init = ( "Hello, World!", Cmd.none )

-- VIEW

view : Model -> Html Message
view model =
    div [class "uk-width-medium-5-6", style [( "margin-left", "auto" ), ( "margin-right", "auto" )]]
        [article [class "uk-article"]
             [text model,
              div [] Armsman.patch_1_121,
              hr [] [],
              div [] Cabalist.patch_1_121]]

-- UPDATE

update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case message of
        Message.NoOp -> ( model, Cmd.none )

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
