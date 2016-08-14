module Main exposing (..)

import Html exposing (Html, div, text, article, hr, a, nav, ul, li, h2)
import Html.App
import Html.Attributes exposing (class, style, href)
import Html.Events exposing (onClick)
import Message exposing (..)
import Style exposing (..)
import Patch1_121
import Animist
import Armsman
import Bainshee
import Bard
import Berserker
import Blademaster
import Bonedancer
import Cabalist
import Champion
import Cleric
import Druid
import Eldritch
import Enchanter
import Friar
import Healer
import Heretic
import Hero
import Hunter
import Infiltrator
import Mauler
import Mentalist
import Mercenary
import Minstrel
import Necromancer
import Nightshade
import Paladin
import Ranger
import Reaver
import Runemaster
import Savage
import Scout
import Shadowblade
import Shaman
import Skald
import Sorcerer
import Spiritmaster
import Thane
import Theurgist
import Valewalker
import Valkyrie
import Vampiir
import Warden
import Warlock
import Warrior
import Wizard

-- MODEL

type alias Model = Message


init : ( Model, Cmd Message )
init = ( TopPage, Cmd.none )

-- VIEW

top_menu : Html Message
top_menu =
    nav [class "uk-navbar"]
        [ul [class "uk-navbar-nav"]
             [li [] [a [onClick TopPage] [text "DAoC Patch Notes"]],
              li [] [a [onClick AlbionPage] [text "アルビオン"]],
              li [] [a [onClick MidgardPage] [text "ミッドガルド"]],
              li [] [a [onClick HiberniaPage] [text "ヒベルニア"]]]]


top_page : Html Message
top_page =
    div []
        [top_menu,
         make_content
             [h2 [] [text "パッチノート"],
              ul []
                  [li [] [a [onClick Patch_1_121_Page] [text "1.121"]],
                   li [] [a [] [text "1.121B"]],
                   li [] [a [] [text "1.121C"]]],
              h2 [] [text "クラス"],
              div [class "uk-grid"]
                  [div [class "uk-width-medium-1-3 uk-row-first"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick AlbionPage, style [( "color", color_alb )]] [text "アルビオン"],
                                    a [onClick ArmsmanPage] [text "アームズマン"],
                                    a [onClick MercenaryPage] [text "マーセナリー"],
                                    a [onClick PaladinPage] [text "パラディン"],
                                    a [onClick ReaverPage] [text "リーバー"],
                                    a [onClick ClericPage] [text "クレリック"],
                                    a [onClick FriarPage] [text "フライアー"],
                                    a [onClick HereticPage] [text "ヘレティック"],
                                    a [onClick WizardPage] [text "ウィザード"],
                                    a [onClick SorcererPage] [text "ソーサラー"],
                                    a [onClick TheurgistPage] [text "サージスト"],
                                    a [onClick CabalistPage] [text "カバリスト"],
                                    a [onClick NecromancerPage] [text "ネクロマンサー"],
                                    a [onClick InfiltratorPage] [text "インフィルトレーター"],
                                    a [onClick ScoutPage] [text "スカウト"],
                                    a [onClick MinstrelPage] [text "ミンストレル"]]]],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick MidgardPage, style [( "color", color_mid )]] [text "ミッドガルド"],
                                    a [onClick WarriorPage] [text "ウォリアー"],
                                    a [onClick ThanePage] [text "セイン"],
                                    a [onClick BerserkerPage] [text "バーサーカー"],
                                    a [onClick SkaldPage] [text "スカルド"],
                                    a [onClick SavagePage] [text "サヴェジ"],
                                    a [onClick ValkyriePage] [text "ヴァルキリー"],
                                    a [onClick HealerPage] [text "ヒーラー"],
                                    a [onClick ShamanPage] [text "シャーマン"],
                                    a [onClick RunemasterPage] [text "ルーンマスター"],
                                    a [onClick SpiritmasterPage] [text "スピリットマスター"],
                                    a [onClick BonedancerPage] [text "ボーンダンサー"],
                                    a [onClick WarlockPage] [text "ウォーロック"],
                                    a [onClick ShadowbladePage] [text "シャドウブレード"],
                                    a [onClick HunterPage] [text "ハンター"]]]],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick HiberniaPage, style [( "color", color_hib )]] [text "ヒベルニア"],
                                    a [onClick HeroPage] [text "ヒーロー"],
                                    a [onClick BlademasterPage] [text "ブレードマスター"],
                                    a [onClick ChampionPage] [text "チャンピオン"],
                                    a [onClick ValewalkerPage] [text "ヴェールウォーカー"],
                                    a [onClick VampiirPage] [text "ヴァンピール"],
                                    a [onClick DruidPage] [text "ドルイド"],
                                    a [onClick BardPage] [text "バード"],
                                    a [onClick WardenPage] [text "ウォーデン"],
                                    a [onClick EldritchPage] [text "エルドリッチ"],
                                    a [onClick EnchanterPage] [text "エンチャンター"],
                                    a [onClick MentalistPage] [text "メンタリスト"],
                                    a [onClick AnimistPage] [text "アニミスト"],
                                    a [onClick BainsheePage] [text "バンシー"],
                                    a [onClick NightshadePage] [text "ナイトシェード"],
                                    a [onClick RangerPage] [text "レンジャー"]]]]],
              div [class "uk-grid"]
                  [div [class "uk-width-medium-1-3 uk-row-first"] [],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [style [( "color", color_common )]] [text "共通"],
                                    a [onClick MaulerPage] [text "モーラー"]]]]]]]


albion_page : Html Message
albion_page =
    div []
        [top_menu,
         make_content (Armsman.patch_1_121 ++ Cabalist.patch_1_121 ++ Cleric.patch_1_121 ++ Friar.patch_1_121 ++ Heretic.patch_1_121 ++ Infiltrator.patch_1_121 ++ Mauler.patch_1_121 ++ Mercenary.patch_1_121 ++ Minstrel.patch_1_121 ++ Necromancer.patch_1_121 ++ Paladin.patch_1_121 ++ Scout.patch_1_121 ++ Reaver.patch_1_121 ++ Sorcerer.patch_1_121 ++ Theurgist.patch_1_121 ++ Wizard.patch_1_121)]


midgard_page : Html Message
midgard_page =
    div []
        [top_menu,
         make_content (Berserker.patch_1_121 ++ Bonedancer.patch_1_121 ++ Healer.patch_1_121 ++ Hunter.patch_1_121 ++ Mauler.patch_1_121 ++ Runemaster.patch_1_121 ++ Savage.patch_1_121 ++ Shadowblade.patch_1_121 ++ Shaman.patch_1_121 ++ Skald.patch_1_121 ++ Spiritmaster.patch_1_121 ++ Thane.patch_1_121 ++ Valkyrie.patch_1_121 ++ Warlock.patch_1_121 ++ Warrior.patch_1_121)]


hibernia_page : Html Message
hibernia_page =
    div []
        [top_menu,
         make_content (Animist.patch_1_121 ++ Bainshee.patch_1_121 ++ Bard.patch_1_121 ++ Blademaster.patch_1_121 ++ Champion.patch_1_121 ++ Druid.patch_1_121 ++ Eldritch.patch_1_121 ++ Enchanter.patch_1_121 ++ Hero.patch_1_121 ++ Mauler.patch_1_121 ++ Mentalist.patch_1_121 ++ Nightshade.patch_1_121 ++ Ranger.patch_1_121 ++ Valewalker.patch_1_121 ++ Vampiir.patch_1_121 ++ Warden.patch_1_121)]


view : Model -> Html Message
view model =
    case model of
        TopPage -> top_page
        Patch_1_121_Page -> div [] [top_menu, make_content Patch1_121.patch_1_121]
        AlbionPage -> albion_page
        MidgardPage -> midgard_page
        HiberniaPage -> hibernia_page
        AnimistPage -> div [] [top_menu, make_content Animist.patch_1_121]
        ArmsmanPage -> div [] [top_menu, make_content Armsman.patch_1_121]
        BainsheePage -> div [] [top_menu, make_content Bainshee.patch_1_121]
        BardPage -> div [] [top_menu, make_content Bard.patch_1_121]
        BerserkerPage -> div [] [top_menu, make_content Berserker.patch_1_121]
        BlademasterPage -> div [] [top_menu, make_content Blademaster.patch_1_121]
        BonedancerPage -> div [] [top_menu, make_content Bonedancer.patch_1_121]
        CabalistPage -> div [] [top_menu, make_content Cabalist.patch_1_121]
        ChampionPage -> div [] [top_menu, make_content Champion.patch_1_121]
        ClericPage -> div [] [top_menu, make_content Cleric.patch_1_121]
        DruidPage -> div [] [top_menu, make_content Druid.patch_1_121]
        EldritchPage -> div [] [top_menu, make_content Eldritch.patch_1_121]
        EnchanterPage -> div [] [top_menu, make_content Enchanter.patch_1_121]
        FriarPage -> div [] [top_menu, make_content Friar.patch_1_121]
        HealerPage -> div [] [top_menu, make_content Healer.patch_1_121]
        HereticPage -> div [] [top_menu, make_content Heretic.patch_1_121]
        HeroPage -> div [] [top_menu, make_content Hero.patch_1_121]
        HunterPage -> div [] [top_menu, make_content Hunter.patch_1_121]
        InfiltratorPage -> div [] [top_menu, make_content Infiltrator.patch_1_121]
        MaulerPage -> div [] [top_menu, make_content Mauler.patch_1_121]
        MentalistPage -> div [] [top_menu, make_content Mentalist.patch_1_121]
        MercenaryPage -> div [] [top_menu, make_content Mercenary.patch_1_121]
        MinstrelPage -> div [] [top_menu, make_content Minstrel.patch_1_121]
        NecromancerPage -> div [] [top_menu, make_content Necromancer.patch_1_121]
        NightshadePage -> div [] [top_menu, make_content Nightshade.patch_1_121]
        PaladinPage -> div [] [top_menu, make_content Paladin.patch_1_121]
        RangerPage -> div [] [top_menu, make_content Ranger.patch_1_121]
        ReaverPage -> div [] [top_menu, make_content Reaver.patch_1_121]
        RunemasterPage -> div [] [top_menu, make_content Runemaster.patch_1_121]
        SavagePage -> div [] [top_menu, make_content Savage.patch_1_121]
        ScoutPage -> div [] [top_menu, make_content Scout.patch_1_121]
        ShadowbladePage -> div [] [top_menu, make_content Shadowblade.patch_1_121]
        ShamanPage -> div [] [top_menu, make_content Shaman.patch_1_121]
        SkaldPage -> div [] [top_menu, make_content Skald.patch_1_121]
        SorcererPage -> div [] [top_menu, make_content Sorcerer.patch_1_121]
        SpiritmasterPage -> div [] [top_menu, make_content Spiritmaster.patch_1_121]
        ThanePage -> div [] [top_menu, make_content Thane.patch_1_121]
        TheurgistPage -> div [] [top_menu, make_content Theurgist.patch_1_121]
        ValewalkerPage -> div [] [top_menu, make_content Valewalker.patch_1_121]
        ValkyriePage -> div [] [top_menu, make_content Valkyrie.patch_1_121]
        VampiirPage -> div [] [top_menu, make_content Vampiir.patch_1_121]
        WardenPage -> div [] [top_menu, make_content Warden.patch_1_121]
        WarlockPage -> div [] [top_menu, make_content Warlock.patch_1_121]
        WarriorPage -> div [] [top_menu, make_content Warrior.patch_1_121]
        WizardPage -> div [] [top_menu, make_content Wizard.patch_1_121]

-- UPDATE

update : Message -> Model -> ( Model, Cmd Message )
update message model =
    ( message, Cmd.none )

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
