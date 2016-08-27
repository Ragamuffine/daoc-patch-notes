module Valewalker exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヴェールウォーカー 1.121"],
     text "ヴェールウォーカーはフルリスペックされる。",
     sechib "Arboreal Path (基本)",
     text "Level 45 lifedrain のダメージは 164 から 179 に増加する。",
     sechib "Arboreal Path (スペック)",
     text "ABS buff のレベルが下げられる。",
     ulist ["Level 20 ABS self-buff Moss Cover は Level 15 になる。",
            "Level 30 ABS self-buff Moss Sheet は Level 25 になる。"],
     text "自己 celerity のレベルが下げられる。",
     ulist ["Level 8 celerity Rushing Kudzu は Level 3 になる。",
            "Level 38 celerity Celerity of Kudzu は Level 31 になる。",
            "Level 48 celerity Rampant Speed は Level 49 になる。"],
     text "instant snare のレベルが下げられる。",
     ulist ["Level 9 instant snare Hide Path は Level 2 になる。",
            "Level 17 instant snare Obscure Path は Level 11 になる。",
            "Level 37 instant snare Darken Path は Level 32 になる。"],
     text "Level 39 Damage Add Bristled Weapons は Level 29 になる。",
     text "Level 40 AoE disease Blight Sworm は Level 39 になる。",
     text "instant DoT は削除される。",
     br [] [],
     text "新しい single DD が追加される。",
     ulist ["Level 6 - Nature's Rot - Instant cast - 再使用30秒 - 1500 range - 6 power - 40 matter damage.",
            "Level 12 - Nature's Decay - Instant cast - 再使用30秒 - 1500 range - 9 power - 58 matter damage.",
            "Level 23 - Nature's Blight - Instant cast - 再使用30秒 - 1500 range - 16 power - 86 matter damage.",
            "Level 35 - Nature's Venom - Instant cast - 再使用30秒 - 1500 range - 20 power - 115 matter damage.",
            "Level 42 - Nature's Bane - Instant cast - 再使用30秒 - 1500 range - 29 power - 160 matter damage."],
     text "新しい single DD が追加される。",
     ulist ["Level 8 - Minor Flashfire - 2.6s cast - 1500 range - 5 power - 23 heat damage.",
            "Level 18 - Lesser Flashfire - 2.6s cast - 1500 range - 10 power - 61 heat damage.",
            "Level 28 - Flashfire - 2.6s cast - 1500 range - 18 power - 102 heat damage.",
            "Level 38 - Searing Flashfire - 2.6s cast - 1500 range - 24 power - 137 heat damage.",
            "Level 48 - Scorching Flashfire - 2.6s cast - 1500 range - 33 power - 179 heat damage."],
     text "single target melee damage ablative は削除される。",
     br [] [],
     text "新しく group target melee ablative buff が追加される。",
     ulist ["Level 13 - Barkcrust - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 50 melee damage 吸収",
            "Level 26 - Barkcoat - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 100 melee damage 吸収",
            "Level 37 - Barksgeath - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 10% power - 200 melee damage 吸収",
            "Level 50 - Barkshell - 2.8s cast - 再使用90秒 - 1000 range - 30秒間継続 - 25% power - 300 melee damage 吸収"],
     text "新しい spirit resistance debuff が追加される。",
     ulist ["Level 20 - Crumble Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - spirit resistance debuff 15%.",
            "Level 30 - Fade Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - spirit resistance debuff 30%.",
            "Level 40 - Vanquish Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - spirit resistance debuff 50%."],
     text "Level 44 instant PBAoE disease は Level 37 になる。",
     sechib "Scythe (スペック)",
     ulist ["Level 15 - Thorny Shield - Sawgrass - damage shield に替わって 26% attack speed debuff",
            "Level 18 - Winter's Scythe - Foxfire - damage add に替わって 1% ABS debuff"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "ヴェールウォーカー 1.121B"],
     text "spirit resistance デバフは以下のように習性される。",
     ulist ["再使用タイマーが5秒から30秒に延長される。",
            "Level 40 debuff Energy Void の効果は50%から40%に低下する。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
