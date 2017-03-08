module Style exposing (..)

import Html exposing (..)
import Message exposing (..)
import Html.Attributes exposing (class, style)
import Html.Events exposing (onClick)
import Svg exposing (svg)
import Svg.Attributes exposing (d, viewBox, path)


ulist : List String -> Html Message
ulist l =
    ul [class "uk-list uk-list-striped"] (List.map (\s -> li [] [text s]) l)


sec : String -> Html Message
sec s =
    h3 [style [( "border-left", "3px solid #e6e600" ), ( "padding-left", "6px" )]] [text s]


color_alb : String
color_alb = "#cc0000"


color_mid : String
color_mid = "#00afee"


color_hib : String
color_hib = "#00e64d"


color_common : String
color_common = "#cc9900"


sec_template : String -> String -> Html Message
sec_template color message =
    h3 [style [( "border-left", "3px solid " ++ color ), ( "padding-left", "6px" )]] [text message]


secalb : String -> Html Message
secalb = sec_template color_alb


secmid : String -> Html Message
secmid = sec_template color_mid


sechib : String -> Html Message
sechib = sec_template color_hib


seccommon : String -> Html Message
seccommon = sec_template color_common


make_top_content : List (Html Message) -> Html Message
make_top_content content =
    div [class "uk-width-medium-5-6", style [( "margin-top", "40px" ), ( "margin-left", "auto" ), ( "margin-right", "auto" ), ( "margin-bottom", "40px" )]]
        [article [class "uk-article"] content]


make_content : List (Html Message) -> Html Message
make_content content =
    div [class "uk-width-medium-5-6", style [( "margin-top", "40px" ), ( "margin-left", "auto" ), ( "margin-right", "auto" ), ( "margin-bottom", "40px" )]]
        [article [class "uk-article"] content,
         i [class "uk-icon-home uk-icon-large home-button", onClick TopPage] []]


svg_github : Html Message
svg_github =
    svg [Svg.Attributes.width "20", Svg.Attributes.height "20", viewBox "0 0 20 20"]
        [Svg.path [d "M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z"] []]
