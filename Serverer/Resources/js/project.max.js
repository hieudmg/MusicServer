require = function s(r, a, c) {
    function h(o, e) {
        if (!a[o]) {
            if (!r[o]) {
                var t = "function" == typeof require && require;
                if (!e && t) return t(o, !0);
                if (l) return l(o, !0);
                var n = new Error("Cannot find module '" + o + "'");
                throw n.code = "MODULE_NOT_FOUND", n
            }
            var i = a[o] = {exports: {}};
            r[o][0].call(i.exports, function (e) {
                var t = r[o][1][e];
                return h(t || e)
            }, i, i.exports, s, r, a, c)
        }
        return a[o].exports
    }

    for (var l = "function" == typeof require && require, e = 0; e < c.length; e++) h(c[e]);
    return h
}({
    CompletedLevelLayerController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a52fbTz/bxG36xjjCRjsmC6", "CompletedLevelLayerController"), cc.Class({
            extends: cc.Component,
            properties: {
                labelScore: cc.Label,
                labelBonusScore: cc.Label,
                labelTotalScore: cc.Label,
                labelLevel: cc.Label
            },
            start: function () {
            },
            setInfo: function (e, t, o) {
                var n = this;
                this.labelScore.string = "Score: " + t.toString(), this.labelLevel.string = "Level " + e.toString();
                var i = 5 * o, s = 0, r = setInterval(function () {
                    s += 5, n.labelBonusScore.string = "Time Bonus: " + s.toString(), n.labelTotalScore.string = "Total: " + (t + s).toString(), i <= s && clearInterval(r)
                }, 1)
            },
            setBonusX2: function (e, t) {
                var o = this, n = 5 * t, i = n;
                e -= i;
                var s = setInterval(function () {
                    i += 5, n -= 5, o.labelBonusScore.string = "Time Bonus: " + i.toFixed(0), o.labelTotalScore.string = "Total: " + (e + i).toFixed(0), n <= 0 && clearInterval(s)
                }, 1)
            }
        }), cc._RF.pop()
    }, {}], GameOverLayerController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "760f8Som/VHIbRk+heTkPx3", "GameOverLayerController"), cc.Class({
            extends: cc.Component,
            properties: {labelScore: cc.Label, labelLevel: cc.Label},
            start: function () {
            },
            setInfo: function (e, t) {
                this.labelScore.string = "Score: " + e.toString(), this.labelLevel.string = "Level " + t.toString()
            }
        }), cc._RF.pop()
    }, {}], LeaderboardController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "1863alIoHlMTrLZzx3p0ywC", "LeaderboardController");
        var i = "GlobalScore1";
        cc.Class({
            extends: cc.Component,
            properties: {
                listUserController: {default: [], type: cc.Node},
                breakLine: cc.Node,
                loadingIndicator: cc.Node
            },
            startRanking: function (e) {
                this.getUserController(), this.saveLeaderboard(e)
            },
            getUserController: function () {
                for (var e = 0; e < this.listUserController.length; e++) this.listUserController[e].active = !1;
                this.breakLine.active = !1, this.loadingIndicator.active = !0
            },
            moveUserPosition: function (e) {
            },
            saveLeaderboard: function (t) {
                var o = this;
                3e6 < t && (t = 3e6), "undefined" != typeof FBInstant && FBInstant.getLeaderboardAsync(i).then(function (e) {
                    return e.setScoreAsync(t)
                }).then(function (e) {
                    o.loadLeaderboard(e.getRank())
                }).catch(function (e) {
                    console.log("Error updating score leaderboard: " + e.message)
                })
            },
            loadLeaderboard: function (o) {
                var n = this;
                FBInstant.getLeaderboardAsync(i).then(function (e) {
                    return e.getEntriesAsync(5, 0)
                }).then(function (e) {
                    for (var t = 0; t < e.length; t++) n.listUserController[t].getComponent("UserRankingController").setInfo(e[t].getRank(), e[t].getPlayer().getPhoto(), e[t].getPlayer().getName(), e[t].getScore(), e[t].getRank() == o)
                }).catch(function (e) {
                    console.log("Error load 0-5")
                }), o < 11 ? (this.moveUserPosition(!0), FBInstant.getLeaderboardAsync(i).then(function (e) {
                    return e.getEntriesAsync(5, 5)
                }).then(function (e) {
                    for (var t = 0; t < e.length; t++) n.listUserController[t + 5].getComponent("UserRankingController").setInfo(e[t].getRank(), e[t].getPlayer().getPhoto(), e[t].getPlayer().getName(), e[t].getScore(), e[t].getRank() == o)
                }).catch(function (e) {
                    console.log("Error load 5-10 " + e.message)
                })) : (this.moveUserPosition(!1), this.breakLine.active = !0, FBInstant.getLeaderboardAsync(i).then(function (e) {
                    return e.getEntriesAsync(5, o - 2)
                }).then(function (e) {
                    for (var t = 0; t < e.length; t++) n.listUserController[t + 5].getComponent("UserRankingController").setInfo(e[t].getRank(), e[t].getPlayer().getPhoto(), e[t].getPlayer().getName(), e[t].getScore(), e[t].getRank() == o)
                }).catch(function (e) {
                    console.log("Error load neighbours: " + e.message)
                })), this.loadingIndicator.active = !1
            }
        }), cc._RF.pop()
    }, {}], MenuController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "80587J1eXVNnZdCV2xloT9i", "MenuController");
        var n = e("./StaticVar.js");
        cc.Class({
            extends: cc.Component,
            properties: {soundButton: cc.Sprite, soundSprite: {default: [], type: cc.SpriteFrame}},
            start: function () {
                cc.sys.localStorage.getItem("sound") || cc.sys.localStorage.setItem("sound", 1), 1 == cc.sys.localStorage.getItem("sound") ? (n.Sound = !0, this.soundButton.spriteFrame = this.soundSprite[0]) : (n.Sound = !1, this.soundButton.spriteFrame = this.soundSprite[1])
            },
            onSoundClick: function () {
                if (n.Sound) {
                    if (n.Sound = !1, this.soundButton.spriteFrame = this.soundSprite[1], cc.sys.localStorage.setItem("sound", 0), "undefined" == typeof FBInstant) return;
                    FBInstant.logEvent("SOUND_OFF")
                } else {
                    if (n.Sound = !0, this.soundButton.spriteFrame = this.soundSprite[0], cc.sys.localStorage.setItem("sound", 1), "undefined" == typeof FBInstant) return;
                    FBInstant.logEvent("SOUND_ON")
                }
            },
            onPauseClick: function (e) {
            },
            switchGame: function () {
                "undefined" != typeof FBInstant && (FBInstant.logEvent("SWITCH WORD CONNECT INSTANT", 1), FBInstant.switchGameAsync("316441705567454").catch(function (e) {
                    console.log(e)
                }))
            }
        }), cc._RF.pop()
    }, {"./StaticVar.js": "StaticVar"}], PlayController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "0cd0c18wHVHnISdwLo2jcAU", "PlayController");
        var r = 244, a = 194, c = .05, l = e("./Point.js"), n = e("./StaticVar.js"), i = 0;
        cc.Class({
            extends: cc.Component,
            properties: {
                pkmNode1: cc.Node,
                pokemonBlock: cc.Prefab,
                lineNode: cc.Node,
                connectedLine: {default: [], type: cc.Node},
                startLayer: cc.Node,
                startLayerWithContinue: cc.Node,
                selectModeLayer: cc.Node,
                pauseLayer: cc.Node,
                gameOverLayer: cc.Node,
                completeLayer: cc.Node,
                victoryLayer: cc.Node,
                soundBlockPress: cc.AudioClip,
                soundMatchSuccess: cc.AudioClip,
                soundMatchFail: cc.AudioClip,
                listBackgrounds: {default: [], type: cc.SpriteFrame},
                touchPokemonBG: cc.SpriteFrame,
                normalPokemonBG: cc.SpriteFrame,
                rebornNode: cc.Node,
                scoreNode: cc.Node,
                timeNode: cc.Node,
                pkmNode2: cc.Node,
                rankPopup: cc.Node,
                menuController: cc.Node,
                banner: cc.Node,
                noMoreLabel: cc.Node,
                videoBonusTime: cc.Node,
                videoBonusLife: cc.Node,
                createShortcutNode: cc.Node,
                adsButton: cc.Node,
                adsBonus: cc.Node
            },
            onLoad: function () {
                cc.director.on(cc.Director.EVENT_AFTER_DRAW, function () {
                }), cc.view.getVisibleSize().width / cc.view.getVisibleSize().height < 1.4 && (this.scaleNode(this.pkmNode1, .85), this.scaleNode(this.pkmNode2, .85), this.scaleNode(this.menuController, .85), this.scaleNode(this.lineNode, .85))
            },
            scaleNode: function (e, t) {
                e.scaleX = t, e.scaleY = t
            },
            start: function () {
                this.videoTime = 0, this.videoLife = 0, this.changeParent = !0, this._rebornController = this.rebornNode.getComponent("RebornController"), this._scoreAreaController = this.scoreNode.getComponent("ScoreAreaController"), this._timeBarController = this.timeNode.getComponent("TimeBarController"), this._rebornController.setPauseState(), this._numberOfPokemonSpecies = 0, this._touchedPokemon1 = null, this._touchedPokemon2 = null, this._pokeMap = [], this._zeroCount = 0, this.normalMode = !0, this._pokeMapWidth = 18, this._pokeMapHeight = 9, this._mapCenterLeft, this._mapCenterRight, this._mapCenterTop, this._mapCenterBottom, this._blockScale = 0, this.setLevel(1), this._listPokemon = [], this._listPokemonIndex = [], this._pokemonPool = [], this.showCreateShortcut(), this.loadGame(), this.initPool((this._pokeMapHeight - 2) * (this._pokeMapWidth - 2))
            },
            helpAnim: function () {
                0 < this._rebornController.getRemainTime() || (this._rebornController.helpPlay(), this.scheduleOnce(function () {
                    this._rebornController.helpStop()
                }, 8))
            },
            showCreateShortcut: function () {
                var t = this;
                "undefined" == typeof FBInstant ? this.createShortcutNode.active = !1 : FBInstant.canCreateShortcutAsync().then(function (e) {
                    e && 0 == cc.sys.localStorage.getItem("CreateShortcut", 0) ? t.createShortcutNode.active = !0 : t.createShortcutNode.active = !1
                })
            },
            createShortcut: function () {
                var e = this;
                FBInstant.createShortcutAsync().then(function () {
                    cc.sys.localStorage.setItem("CreateShortcut", 1), e.createShortcutNode.active = !1
                }).catch(function () {
                    e.createShortcutNode.active = !1
                })
            },
            closeCreateShortcut: function () {
                this.createShortcutNode.active = !1
            },
            getLevel: function () {
                return this._level
            },
            setLevel: function (e) {
                this._level = e, this._logicType = (e - 1) % 11
            },
            showMenu: function (e) {
                this.pauseLayer.active = !0, this.adsButton.active = !0, e ? (console.log("start new game"), this.startLayer.active = !0) : (console.log("start Continue"), this.startLayerWithContinue.active = !0)
            },
            buttonNewGame: function () {
                this.gameOverLayer.active = !1, this.victoryLayer.active = !1, this.selectModeLayer.active = !0, this.startLayer.active = !1, this.startLayerWithContinue.active = !1, this._timeBarController.loadVideo(), this.adsBonus.active = !1, this.adsButton.active = !1, this._suggestPokemon && (this._suggestPokemon[0] && (this._suggestPokemon[0].node.stopAllActions(), this._suggestPokemon[0].setBackgroundPokemon(this.normalPokemonBG)), this._suggestPokemon[1] && (this._suggestPokemon[1].node.stopAllActions(), this._suggestPokemon[1].setBackgroundPokemon(this.normalPokemonBG))), this._touchedPokemon1 = null, this._touchedPokemon2 = null
            },
            initGameWithMode: function (e, t) {
                this.normalMode = 1 == t, this.videoTime = 0, this.videoLife = 0, this._rebornController.showInterstitial(), n.Freeze = !1, this.pauseLayer.active = !1, this.selectModeLayer.active = !1, this.adsButton.active = !1, this._rebornController.setResumeState(), this._rebornController.resetSuggest(), this.initMapParameters(), this.clearMap(), this.clearPokemon(), this.genMap(), this.arrangePokemonBlocks(), this.initMaxTime(), this.resetLevel(), this._timeBarController.startTimer(), this._timeBarController.resetTime(), this._timeBarController.countTimer(), this._isSuggestion = !1, n.Freeze = !1, this.deleteSaveGame()
            },
            initMaxTime: function () {
                var e = (this._pokeMapHeight - 2) * (this._pokeMapWidth - 2);
                this._timeBarController.setMaxTime(e)
            },
            resetLevel: function () {
                this.setLevel(1), this._scoreAreaController.setLevel(this._level), this._rebornController.setReborn(10), this._scoreAreaController.resetScore()
            },
            clearMap: function () {
                this._pokeMap = [];
                for (var e = 0; e < this._pokeMapHeight; e++) {
                    this._pokeMap[e] = [];
                    for (var t = 0; t < this._pokeMapWidth; t++) this._pokeMap[e].push(0)
                }
            },
            clearPokemon: function () {
                for (var e = 0; e < this._listPokemon.length; e++) this._listPokemon[e].node.active = !1;
                this._listPokemon = []
            },
            genMap: function () {
                var e = (this._pokeMapHeight - 2) * (this._pokeMapWidth - 2);
                this._zeroCount = 2 * (this._pokeMapHeight + this._pokeMapWidth - 2), this._numberOfPokemonSpecies = e / 4, this._numberOfPokemonSpecies > this.listBackgrounds.length && (this._numberOfPokemonSpecies = this.listBackgrounds.length);
                for (var t = e / 2 % this._numberOfPokemonSpecies * 2, o = e / 2 / this._numberOfPokemonSpecies * 2, n = [], i = 0; i < o; i++) for (var s = 1; s <= this._numberOfPokemonSpecies; s++) n.push(s);
                for (s = 0; s < t; s += 2) n.push(s / 2 + 1), n.push(s / 2 + 1);
                var r = [];
                for (s = 1; s < this._pokeMapHeight - 1; s++) for (i = 1; i < this._pokeMapWidth - 1; i++) {
                    var a = Math.floor(Math.random() * n.length);
                    this._pokeMap[s][i] = n[a], n.splice(a, 1), r.push(new l(s, i))
                }
                this.checkAvailableMap(r) || this.rearrangeMap(), this.limitNeighborPaired(Math.ceil((this._pokeMapHeight - 2) * (this._pokeMapWidth - 2) * .04))
            },
            checkAvailableMap: function (e) {
                for (var t = 0; t < e.length; t++) for (var o = t + 1; o < e.length; o++) {
                    if (0 < this.checkPossibleMove(e[t], e[o]).length) return !0
                }
                return !1
            },
            checkPossibleMove: function (e, t) {
                return this.findPath(this._pokeMap, this._pokeMapHeight, this._pokeMapWidth, e, t)
            },
            rearrangeMap: function () {
                for (var e = [], t = [], o = 1; o < this._pokeMapHeight - 1; o++) for (var n = 1; n < this._pokeMapWidth - 1; n++) 0 != this._pokeMap[o][n] && (e.push(this._pokeMap[o][n]), t.push(new l(o, n)));
                for (o = 0; o < t.length; o++) {
                    var i = Math.floor(Math.random() * e.length);
                    this._pokeMap[t[o].getX()][t[o].getY()] = e[i], e.splice(i, 1)
                }
                this.checkAvailableMap(t) || this.rearrangeMap()
            },
            limitNeighborPaired: function (e) {
                console.log("listNeighborPaired: " + e);
                var t = this.countNeighborPaired();
                if (console.log("countNeighborPaired: " + t.length / 2), t.length > 2 * e) {
                    for (var o = 2 * e; o < t.length; o += 2) {
                        var n = Math.floor(Math.random() * (this._pokeMapHeight - 3)) + 1,
                            i = Math.floor(Math.random() * (this._pokeMapWidth - 3)) + 1;
                        this.swapValue(t[o], new l(n, i))
                    }
                    this.limitNeighborPaired(e)
                }
            },
            countNeighborPaired: function () {
                for (var e = [], t = 1; t < this._pokeMapHeight - 1; t++) for (var o = 1; o < this._pokeMapWidth - 1; o++) {
                    var n = new l(t, o);
                    e.includes(n) || (this._pokeMap[t][o] == this._pokeMap[t + 1][o] && (e.push(n), e.push(new l(t + 1, o))), this._pokeMap[t][o] == this._pokeMap[t][o + 1] && (e.push(n), e.push(new l(t, o + 1))))
                }
                return e
            },
            swapValue: function (e, t) {
                var o = this._pokeMap[e.getX()][e.getY()];
                this._pokeMap[e.getX()][e.getY()] = this._pokeMap[t.getX()][t.getY()], this._pokeMap[t.getX()][t.getY()] = o
            },
            arrangePokemonBlocks: function () {
                for (var e = this._pokeMapHeight - 2; 0 < e; e--) for (var t = 1; t < this._pokeMapWidth - 1; t++) if (0 != this._pokeMap[e][t]) {
                    var o = this.getPokemon();
                    o.parent = this.pkmNode1, o.setPosition(this.convertMapToScreenX(t), this.convertMapToScreenY(e)), o.scaleX = this._blockScale, o.scaleY = this._blockScale;
                    var n = o.getComponent("PokemonBlockController");
                    n.setPokemon(this.listBackgrounds[this._pokeMap[e][t] - 1]), n.resetPokemonState(this.normalPokemonBG), n.setPosition(e, t), this._listPokemon.push(n)
                }
                this.changePokemonParent(), this.changePokemonParent(), this.checkSuggestMap()
            },
            checkSuggestMap: function () {
                this._suggestPokemon = [];
                for (var e = 0; e < this._listPokemon.length; e++) for (var t = e + 1; t < this._listPokemon.length; t++) {
                    if (0 < this.checkPossibleMove(this._listPokemon[e].Position, this._listPokemon[t].Position).length) return this._suggestPokemon.push(this._listPokemon[e]), this._suggestPokemon.push(this._listPokemon[t]), !0
                }
                return !1
            },
            convertMapToScreenX: function (e) {
                return (e - (this._pokeMapWidth - 1) / 2) * (this._blockScale * a)
            },
            convertMapToScreenY: function (e) {
                return (e - (this._pokeMapHeight - .4) / 2) * this._blockScale * r
            },
            initMapParameters: function () {
                var e = this.pkmNode1.height, t = this.pkmNode1.width;
                if (this.normalMode) {
                    this._pokeMapHeight = 9, this._pokeMapWidth = 18;
                    var o = t / 3298, n = .8 * e / ((this._pokeMapHeight - 2) * r);
                    this._blockScale = Math.min(o, n)
                } else {
                    this._pokeMapHeight = 11, this._pokeMapWidth = 18;
                    o = t / 3104, n = .85 * e / ((this._pokeMapHeight - 2) * r);
                    this._blockScale = Math.min(o, n)
                }
                console.log(this._blockScale), this.calculateMapCenterParams()
            },
            calculateMapCenterParams: function () {
                this._pokeMapHeight % 2 == 0 ? this._mapCenterBottom = this._pokeMapHeight / 2 - 1 : this._mapCenterBottom = (this._pokeMapHeight - 1) / 2, this._mapCenterTop = this._mapCenterBottom + 1, this._pokeMapWidth % 2 == 0 ? this._mapCenterLeft = this._pokeMapWidth / 2 - 1 : this._mapCenterLeft = (this._pokeMapWidth - 1) / 2, this._mapCenterRight = this._mapCenterLeft + 1
            },
            updatePokemonBlockScale: function (e) {
                for (var t = 0; t < this._pokemonPool; t++) this._pokemonPool[t].scaleX = e, this._pokemonPool[t].scaleY = e
            },
            initPool: function (e) {
                for (var t = 0; t < e; t++) this.initPokemon()
            },
            initPokemon: function () {
                var e = cc.instantiate(this.pokemonBlock);
                return this._pokemonPool.push(e), e.active = !1, e
            },
            newPkm: function () {
                return cc.instantiate(this.pokemonBlock)
            },
            getPokemon: function () {
                for (var e = 0; e < this._pokemonPool.length; e++) if (!this._pokemonPool[e].active) return this._pokemonPool[e].active = !0, this._pokemonPool[e];
                var t = this.initPokemon();
                return t.active = !0, t
            },
            addTouchedPokemon: function (e) {
                this._touchedPokemon1 ? this._touchedPokemon1 == e ? (e.setBackgroundPokemon(this.normalPokemonBG), this._touchedPokemon1 = null) : (this._touchedPokemon2 = e, n.Freeze = !0) : (e.setBackgroundPokemon(this.touchPokemonBG), this._touchedPokemon1 = e)
            },
            checkTouchedPokemon: function () {
                if (!this._touchedPokemon1 || !this._touchedPokemon2) return n.Sound && cc.audioEngine.play(this.soundBlockPress, !1, 1), void(this._touchedPokemon1 || (this.clearSuggestion(), this.checkSuggestMap()));
                var e = this.checkPossibleMove(this._touchedPokemon1.Position, this._touchedPokemon2.Position);
                0 < e.length ? (this.drawConnectedLine(e), this._scoreAreaController.scoreUp(20), this.scheduleOnce(function () {
                    this.destroyMachtedPokemons(this._touchedPokemon1, this._touchedPokemon2), this._touchedPokemon1 = null, this._touchedPokemon2 = null, this._timeBarController.setTimeHelp()
                }, .1), n.Sound && cc.audioEngine.play(this.soundMatchSuccess, !1, 1)) : (this._touchedPokemon1.resetPokemonState(this.normalPokemonBG), this._touchedPokemon2.resetPokemonState(this.normalPokemonBG), this._touchedPokemon1 = null, this._touchedPokemon2 = null, n.Sound && cc.audioEngine.play(this.soundMatchFail, !1, 1), this.clearSuggestion(), this.checkSuggestMap(), n.Freeze = !1)
            },
            drawConnectedLine: function (e) {
                for (var t = [e[0], e[1]], o = e[0].getX() == e[1].getX(), n = 2; n < e.length; n++) o && e[n].getX() == e[n - 1].getX() || !o && e[n].getY() == e[n - 1].getY() ? t.splice(t.length - 1, 1) : o = !o, t.push(e[n]);
                for (n = 0; n < t.length - 1; n++) {
                    var i = null;
                    if (t[n].getX() != t[n + 1].getX()) {
                        var s = Math.abs(t[n].getX() - t[n + 1].getX());
                        0 != t[n].getX() && t[n].getX() != this._pokeMapHeight - 1 && 0 != t[n + 1].getX() && t[n + 1].getX() != this._pokeMapHeight - 1 || (s -= 1 / 6), t[n].getX() < t[n + 1].getX() ? (i = this.connectedLine[1]).active && (i = this.connectedLine[5]) : (i = this.connectedLine[3]).active && (i = this.connectedLine[7]), i.scaleX = this._blockScale * s * r / 94
                    } else {
                        s = Math.abs(t[n].getY() - t[n + 1].getY());
                        0 != t[n].getY() && t[n].getY() != this._pokeMapWidth - 1 && 0 != t[n + 1].getY() && t[n + 1].getY() != this._pokeMapWidth - 1 || (s -= 1 / 6), t[n].getY() > t[n + 1].getY() ? (i = this.connectedLine[0]).active && (i = this.connectedLine[4]) : (i = this.connectedLine[2]).active && (i = this.connectedLine[6]), i.scaleX = this._blockScale * s * a / 94
                    }
                    i.active = !0, this.setPositionConnectedLine(i, t[n])
                }
            },
            setActiveNode: function (e, t) {
                e.active = t
            },
            setPositionConnectedLine: function (e, t) {
                e.setPosition(this.convertMapToScreenX(t.getY()), this.convertMapToScreenY(t.getX())), 0 == t.getX() && e.setPositionY(e.getPositionY() + this._blockScale * a / 4), t.getX() == this._pokeMapHeight - 1 && e.setPositionY(e.getPositionY() - this._blockScale * a / 4), 0 == t.getY() && e.setPositionX(e.getPositionX() + this._blockScale * r / 8), t.getY() == this._pokeMapWidth - 1 && e.setPositionX(e.getPositionX() - this._blockScale * r / 8), this.scheduleOnce(function () {
                    e.active = !1
                }, .1)
            },
            destroyMachtedPokemons: function (e, t) {
                switch (this.clearSuggestion(e, t), this.removePokemonFromMap(e), this.removePokemonFromMap(t), this._zeroCount += 2, this._logicType) {
                    case 1:
                        this.moveDown(1, this._pokeMapWidth - 2);
                        break;
                    case 2:
                        this.moveLeft(1, this._pokeMapHeight - 2);
                        break;
                    case 3:
                        this.moveToBorderVertically();
                        break;
                    case 4:
                        this.moveToBorderHorizontally();
                        break;
                    case 5:
                        this.moveToCenterVertically();
                        break;
                    case 6:
                        this.moveToCenterHorizontally();
                        break;
                    case 7:
                        this.leftGoDownRightGoUp();
                        break;
                    case 8:
                        this.bottomMoveRightTopGoLeft();
                        break;
                    case 9:
                        this.moveToBorderWithAllDirection(e.Position, t.Position);
                        break;
                    case 10:
                        this.moveToCenterFromAllDirection(e.Position, t.Position)
                }
                this.saveGame(), this.changePokemonParent(), this.scheduleOnce(function () {
                    this.checkMapClearedOrCantMove()
                }, .35)
            },
            clearSuggestion: function (e, t) {
                this._isSuggestion && (this._suggestPokemon[0].node.stopAllActions(), this._suggestPokemon[1].node.stopAllActions(), this._suggestPokemon[0] != e && this._suggestPokemon[1] != t && this._suggestPokemon[0].setBackgroundPokemon(this.normalPokemonBG), this._suggestPokemon[1] != e && this._suggestPokemon[1] != t && this._suggestPokemon[1].setBackgroundPokemon(this.normalPokemonBG), this._suggestPokemon = [], this._isSuggestion = !1)
            },
            autoHint: function () {
                n.Freeze || this._isSuggestion || !this._suggestPokemon || 2 == this._suggestPokemon.length && (this._suggestPokemon[0].setBackgroundPokemon(this.touchPokemonBG), this._suggestPokemon[1].setBackgroundPokemon(this.touchPokemonBG), this._isSuggestion = !0, this.scheduleOnce(function () {
                    this.addTouchedPokemon(this._suggestPokemon[0]), this.addTouchedPokemon(this._suggestPokemon[1]), this.checkTouchedPokemon()
                }, .2))
            },
            suggest: function () {
                this._isSuggestion || (2 == this._suggestPokemon.length && (this._suggestPokemon[0].suggestAction(this.touchPokemonBG, this.normalPokemonBG), this._suggestPokemon[1].suggestAction(this.touchPokemonBG, this.normalPokemonBG), this._isSuggestion = !0, this._rebornController.suggest(), this._rebornController.helpStop()), "undefined" != typeof FBInstant && FBInstant.logEvent("HELP_BUTTON"))
            },
            suggestCallback0: function (e, t) {
                this._suggestPokemon[0].setBackgroundPokemon(t)
            },
            suggestAction: function () {
                var e = [cc.delayTime(.5)];
                e.push(cc.callFunc(this.suggestCallback0, this, this.touchPokemonBG)), e.push(cc.delayTime(.5)), e.push(cc.callFunc(this.suggestCallback0, this, this.normalPokemonBG)), this.node.runAction(cc.sequence(e).repeatForever());
                var t = [cc.delayTime(.5)];
                t.push(cc.callFunc(this.suggestCallback1, this, this.touchPokemonBG)), t.push(cc.delayTime(.5)), t.push(cc.callFunc(this.suggestCallback1, this, this.normalPokemonBG)), this.node.runAction(cc.sequence(t).repeatForever())
            },
            suggestCallback1: function (e, t) {
                this._suggestPokemon[1].setBackgroundPokemon(t)
            },
            removePokemonFromMap: function (e) {
                var t = this._listPokemon.indexOf(e);
                this._listPokemon.splice(t, 1), e.node.active = !1, this._pokeMap[e.Position.getX()][e.Position.getY()] = 0, e.resetPokemonState(this.normalPokemonBG)
            },
            checkMapClearedOrCantMove: function () {
                this._zeroCount == this._pokeMapWidth * this._pokeMapHeight ? this.mapCleared(this._level, this._scoreAreaController.Score, this._timeBarController.getRemainingTime()) : this.checkSuggestMap() || (0 < this._rebornController.RebornCount ? (this._rebornController.setReborn(this._rebornController.RebornCount - 1), this.noMoreLabel.getComponent(cc.Animation).play("NoMore"), this.rearrangeMap(), this.rearrangePokemon(), this.saveGame()) : (n.Freeze = !1, this.gameOver())), n.Freeze = !1
            },
            testVideoTime: function () {
                this.gameOver(), this.videoBonusTime.active = !0, this.videoBonusTime.getComponent("VideoBonusController").startTimer()
            },
            testVideoLife: function () {
                this._rebornController.RebornCount = 0, this.gameOver(), this.videoBonusLife.active = !0, this.videoBonusLife.getComponent("VideoBonusController").startTimer()
            },
            stopTimer: function () {
                this.videoBonusTime.getComponent("VideoBonusController").stopTimer(), this.videoBonusLife.getComponent("VideoBonusController").stopTimer()
            },
            gameOver: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                    t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                if (!n.Freeze) {
                    n.Freeze = !0, this._rebornController.setPauseState(), this._timeBarController.stopTimer();
                    for (var o = 0; o < this._listPokemon.length; o++) this._listPokemon[o].node.active = !1;
                    this._timeBarController.checkSupportedAPIs() ? 0 < this._rebornController.RebornCount ? (FBInstant.logEvent("GAMEOVER_TIME_OUT"), this.videoBonusTime.active = !0, this.videoBonusTime.getComponent("VideoBonusController").startTimer()) : (FBInstant.logEvent("GAMEOVER_LIFE_OUT"), this.videoBonusLife.active = !0, this.videoBonusLife.getComponent("VideoBonusController").startTimer()) : this.gameOver1(e, t)
                }
            },
            gameOver1: function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                    t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                this.videoBonusTime.active = !1, this.videoBonusLife.active = !1, this.gameOverLayer.active = !0, this.adsButton.active = !0, 0 == e && 0 == t ? (this.gameOverLayer.getComponent("GameOverLayerController").setInfo(this._scoreAreaController.Score, this._level), this.victoryLayer.getComponent("VictoryLayerController").setBestscore(this._scoreAreaController.Score)) : (this.gameOverLayer.getComponent("GameOverLayerController").setInfo(e, t), this.victoryLayer.getComponent("VictoryLayerController").setBestscore(e)), this.deleteSaveGame()
            },
            videoRewarded: function (e) {
                n.Freeze = !1, 0 == e ? (this.videoBonusTime.active = !1, this._timeBarController.setRemainingTime(120)) : (this.videoBonusLife.active = !1, this.rearrangeMap(), this.rearrangePokemon()), this._timeBarController.resumeTimer(), this._timeBarController.countTimer(), this._rebornController.setResumeState(), this._rebornController.resumeHelp();
                for (var t = 0; t < this._listPokemon.length; t++) this._listPokemon[t].node.active = !0;
                this.saveGame()
            },
            deleteSaveGame: function () {
                "undefined" == typeof FBInstant ? cc.sys.localStorage.setItem("SaveGamePKM", 0) : FBInstant.player.setDataAsync({SaveGamePKM: 0})
            },
            pauseGame: function () {
                this._rebornController.showInterstitial(), n.Freeze = !0, this._timeBarController.stopTimer(), this.pauseLayer.active = !0, this.startLayerWithContinue.active = !0, this.adsButton.active = !0, this._rebornController.setPauseState();
                for (var e = 0; e < this._listPokemon.length; e++) this._listPokemon[e].node.active = !1;
                this.saveGame(), "undefined" != typeof FBInstant && FBInstant.logEvent("PAUSE_GAME_BUTTON")
            },
            resumeGame: function () {
                if (n.Freeze = !1, this.pauseLayer.active = !1, this.startLayerWithContinue.active = !1, this.adsButton.active = !1, this._timeBarController.resumeTimer(), this._timeBarController.countTimer(), this._rebornController.setResumeState(), this._rebornController.resumeHelp(), this._rebornController.loadInterstitial(), this._timeBarController.loadVideo(), 0 < this._listPokemon.length) for (var e = 0; e < this._listPokemon.length; e++) this._listPokemon[e].node.active = !0; else this.arrangePokemonBlocks();
                this.checkSuggestMap() || (this.rearrangeMap(), this.rearrangePokemon(), this.saveGame())
            },
            rankOpen: function () {
                this.menuController.active = !1, this.rankPopup.active = !0, this.rankPopup.getComponent("LeaderboardController").startRanking(this._scoreAreaController.Score)
            },
            rankClose: function () {
                this.menuController.active = !0, this.rankPopup.active = !1
            },
            mapCleared: function (e, t, o) {
                this._rebornController.checkSupportedAds() || (i % 3 == 0 && this.inviteFriends(), i++), this._timeBarController.stopTimer(), n.Freeze = !0, 11 == this._level ? this.showVictoryLayer(t, o) : (this.showWinLayer(e, t, o), this.saveGame())
            },
            rearrangePokemon: function () {
                this.clearPokemon(), this.arrangePokemonBlocks()
            },
            showVictoryLayer: function (e, t) {
                this.showAdsBonus(), this.victoryLayer.active = !0, this.adsButton.active = !0, this._scoreAreaController.updateScore(5 * t), this._rebornController.setPauseState(), this.victoryLayer.getComponent("VictoryLayerController").setInfo(e, t), this.rankPopup.getComponent("LeaderboardController").startRanking(this._scoreAreaController.Score), this.deleteSaveGame()
            },
            showWinLayer: function (e, t, o) {
                this.showAdsBonus(), this.completeLayer.active = !0, this.adsButton.active = !0, this._scoreAreaController.updateScore(5 * o), this._rebornController.setPauseState(), this.completeLayer.getComponent("CompletedLevelLayerController").setInfo(e, t, o), this.rankPopup.getComponent("LeaderboardController").startRanking(this._scoreAreaController.Score), this.victoryLayer.getComponent("VictoryLayerController").setBestscore(t + 5 * o)
            },
            showAdsBonus: function () {
                this._timeBarController.checkSupportedAPIs() ? this.adsBonus.active = !0 : this.adsBonus.active = !1
            },
            videoBonusScore: function (e) {
                this.adsBonus.active = !1, this.completeLayer.getComponent("CompletedLevelLayerController").setBonusX2(this._scoreAreaController.Score, e), this._scoreAreaController.updateScore(5 * e), this.rankPopup.getComponent("LeaderboardController").startRanking(this._scoreAreaController.Score), this.victoryLayer.getComponent("VictoryLayerController").setBestscore(this._scoreAreaController.Score)
            },
            nextLevel: function () {
                11 == this._level ? (this.setLevel(1), this._rebornController.setReborn(10)) : (this._level++, this.setLevel(this._level), this._rebornController.RebornCount++, this._rebornController.setReborn(this._rebornController.RebornCount)), this.completeLayer.active = !1, this.adsButton.active = !1, this.adsBonus.active = !1, this._scoreAreaController.setLevel(this._level), this._rebornController.setResumeState(), this._rebornController.resetSuggest(), this.genMap(), this.arrangePokemonBlocks(), this._timeBarController.resetTime(), this._timeBarController.startTimer(), this._timeBarController.countTimer(), n.Freeze = !1
            },
            findPath: function (e, t, o, n, i) {
                if (e[n.getX()][n.getY()] != e[i.getX()][i.getY()]) return [];
                var s = this.getLines(e, n, t, o);
                if (this.checkLine(s, i)) return [n, i];
                for (var r = this.getLines(e, i, t, o), a = 0; a < s.length; a++) for (var c = 0; c < r.length; c++) {
                    if (0 < (h = this.get1ChangeDirectionLine(s[a], r[c])).length) return h
                }
                for (a = 0; a < s.length; a++) for (c = 0; c < r.length; c++) {
                    var h;
                    if (0 < (h = this.get2ChangeDirectionLine(e, s[a], r[c])).length) return h
                }
                return []
            },
            checkLine: function (e, t) {
                for (var o = 0; o < e.length; o++) for (var n = e[o], i = 0; i < n.length; i++) {
                    var s = n[i];
                    if (this.comparePoint(s, t)) return !0
                }
                return !1
            },
            getLines: function (e, t, o, n) {
                for (var i = [], s = [new l(-1, 0), new l(0, 1), new l(1, 0), new l(0, -1)], r = 0; r < 4; r++) {
                    for (var a = [t], c = t, h = new l(0, 0); !((h = new l(c.getX() + s[r].getX(), c.getY() + s[r].getY())).getX() < 0 || h.getX() >= o || h.getY() < 0 || h.getY() >= n) && (a.push(h), 0 == e[h.getX()][h.getY()]);) c = h;
                    1 < a.length && i.push(a)
                }
                return i
            },
            get1ChangeDirectionLine: function (e, t) {
                for (var o = [], n = 0; n < e.length - 1; n++) for (var i = e[n], s = 0; s < t.length - 1; s++) if (this.comparePoint(i, t[s])) return o.push(e[0]), o.push(e[n]), o.push(t[0]), o;
                return o
            },
            get2ChangeDirectionLine: function (e, t, o) {
                for (var n = [], i = 1; i < t.length; i++) {
                    var s = t[i];
                    if (0 == e[s.getX()][s.getY()]) for (var r = 1; r < o.length; r++) if (0 == e[o[r].getX()][o[r].getY()] && this.isPossibleLine(e, s, o[r])) return n.push(t[0]), n.push(s), n.push(o[r]), n.push(o[0]), n
                }
                return n
            },
            isPossibleLine: function (e, t, o) {
                if (this.comparePoint(t, o)) return !1;
                var n = (o.getX() - t.getX()) / Math.max(Math.abs(o.getX() - t.getX()), 1),
                    i = (o.getY() - t.getY()) / Math.max(Math.abs(o.getY() - t.getY()), 1);
                if (0 != n && 0 != i) return !1;
                for (var s = t; ;) {
                    var r = new l(s.getX() + n, s.getY() + i);
                    if (0 != e[r.getX()][r.getY()]) return !1;
                    if (this.comparePoint(r, o)) return !0;
                    s = r
                }
            },
            comparePoint: function (e, t) {
                return e.getX() == t.getX() && t.getY() == e.getY()
            },
            countSpace: function (e, t) {
                var o = 0, n = !0;
                do {
                    switch (t) {
                        case 1:
                            0 < e.getY() - Math.abs(o) - 1 && 0 == this._pokeMap[e.getX()][e.getY() - Math.abs(o) - 1] ? o-- : n = !1;
                            break;
                        case 2:
                            e.getX() + Math.abs(o) + 1 < this._pokeMapHeight - 1 && 0 == this._pokeMap[e.getX() + Math.abs(o) + 1][e.getY()] ? o++ : n = !1;
                            break;
                        case 3:
                            e.getY() + Math.abs(o) + 1 < this._pokeMapWidth - 1 && 0 == this._pokeMap[e.getX()][e.getY() + Math.abs(o) + 1] ? o++ : n = !1;
                            break;
                        case 4:
                            0 < e.getX() - Math.abs(o) - 1 && 0 == this._pokeMap[e.getX() - Math.abs(o) - 1][e.getY()] ? o-- : n = !1;
                            break;
                        case 5:
                            e.getY() + Math.abs(o) + 1 <= this._mapCenterLeft && 0 == this._pokeMap[e.getX()][e.getY() + Math.abs(o) + 1] ? o++ : e.getY() - Math.abs(o) - 1 >= this._mapCenterRight && 0 == this._pokeMap[e.getX()][e.getY() - Math.abs(o) - 1] ? o-- : n = !1;
                            break;
                        case 6:
                            e.getX() + Math.abs(o) + 1 <= this._mapCenterBottom && 0 == this._pokeMap[e.getX() + Math.abs(o) + 1][e.getY()] ? o++ : e.getX() - Math.abs(o) - 1 >= this._mapCenterTop && 0 == this._pokeMap[e.getX() - Math.abs(o) - 1][e.getY()] ? o-- : n = !1
                    }
                } while (n);
                return o
            },
            moveLeft: function (e, t) {
                e = Math.max(e, 1), t = Math.min(t, this._pokeMapHeight - 2);
                for (var o = e; o <= t; o++) for (var n = 2; n < this._pokeMapWidth - 1; n++) if (0 != this._pokeMap[o][n]) {
                    var i = this.countSpace(new l(o, n), 1);
                    if (0 != i) {
                        this._pokeMap[o][n + i] = this._pokeMap[o][n], this._pokeMap[o][n] = 0;
                        var s = this.findPokemonController(o, n);
                        s && (s.node.runAction(cc.moveBy(c, cc.p(i * a * this._blockScale, 0))), s.move(0, i))
                    }
                }
            },
            moveRight: function (e, t) {
                e = Math.max(e, 1), t = Math.min(t, this._pokeMapHeight - 2);
                for (var o = e; o <= t; o++) for (var n = this._pokeMapWidth - 3; 0 < n; n--) if (0 != this._pokeMap[o][n]) {
                    var i = this.countSpace(new l(o, n), 3);
                    if (0 != i) {
                        this._pokeMap[o][n + i] = this._pokeMap[o][n], this._pokeMap[o][n] = 0;
                        var s = this.findPokemonController(o, n);
                        s && (s.node.runAction(cc.moveBy(c, cc.p(i * a * this._blockScale, 0))), s.move(0, i))
                    }
                }
            },
            moveUp: function (e, t) {
                e = Math.max(1, e), t = Math.min(t, this._pokeMapWidth - 2);
                for (var o = e; o <= t; o++) for (var n = this._pokeMapHeight - 2; 0 < n; n--) if (0 != this._pokeMap[n][o]) {
                    var i = this.countSpace(new l(n, o), 2);
                    if (0 != i) {
                        this._pokeMap[n + i][o] = this._pokeMap[n][o], this._pokeMap[n][o] = 0;
                        var s = this.findPokemonController(n, o);
                        s && (s.node.runAction(cc.moveBy(c, cc.p(0, i * r * this._blockScale))), s.move(i, 0))
                    }
                }
            },
            changePokemonParent: function () {
                if (0 != this._logicType) {
                    this.changeParent = !this.changeParent;
                    for (var e = this._pokeMapHeight - 2; 0 < e; e--) for (var t = 1; t < this._pokeMapWidth - 1; t++) if (0 != this._pokeMap[e][t]) {
                        var o = this.findPokemonController(e, t);
                        o && (this.changeParent ? o.node.parent = this.pkmNode1 : o.node.parent = this.pkmNode2)
                    }
                }
            },
            moveDown: function (e, t) {
                e = Math.max(1, e), t = Math.min(t, this._pokeMapWidth - 2);
                for (var o = e; o <= t; o++) for (var n = 1; n < this._pokeMapHeight - 1; n++) if (0 != this._pokeMap[n][o]) {
                    var i = this.countSpace(new l(n, o), 4);
                    if (0 != i) {
                        this._pokeMap[n + i][o] = this._pokeMap[n][o], this._pokeMap[n][o] = 0;
                        var s = this.findPokemonController(n, o);
                        s && (s.node.runAction(cc.moveBy(c, cc.p(0, i * r * this._blockScale))), s.move(i, 0))
                    }
                }
            },
            moveToCenterHorizontally: function () {
                for (var e = 1; e < this._pokeMapHeight - 1; e++) {
                    for (var t = this._mapCenterLeft - 1; 0 < t; t--) {
                        if (0 != this._pokeMap[e][t]) if (0 != (o = this.countSpace(new l(e, t), 5))) this._pokeMap[e][t + o] = this._pokeMap[e][t], this._pokeMap[e][t] = 0, (n = this.findPokemonController(e, t)) && (n.node.runAction(cc.moveBy(c, cc.p(o * a * this._blockScale, 0))), n.move(0, o))
                    }
                    for (t = this._mapCenterRight + 1; t < this._pokeMapWidth - 1; t++) {
                        var o, n;
                        if (0 != this._pokeMap[e][t]) if (0 != (o = this.countSpace(new l(e, t), 5))) this._pokeMap[e][t + o] = this._pokeMap[e][t], this._pokeMap[e][t] = 0, (n = this.findPokemonController(e, t)) && (n.node.runAction(cc.moveBy(c, cc.p(o * a * this._blockScale, 0))), n.move(0, o))
                    }
                }
            },
            moveToCenterVertically: function () {
                for (var e = 1; e < this._pokeMapWidth - 1; e++) {
                    for (var t = this._mapCenterBottom - 1; 0 < t; t--) {
                        if (0 != this._pokeMap[t][e]) if (0 != (o = this.countSpace(new l(t, e), 6))) this._pokeMap[t + o][e] = this._pokeMap[t][e], this._pokeMap[t][e] = 0, (n = this.findPokemonController(t, e)) && (n.node.runAction(cc.moveBy(c, cc.p(0, o * r * this._blockScale))), n.move(o, 0))
                    }
                    for (t = this._mapCenterTop + 1; t < this._pokeMapHeight - 1; t++) {
                        var o, n;
                        if (0 != this._pokeMap[t][e]) if (0 != (o = this.countSpace(new l(t, e), 6))) this._pokeMap[t + o][e] = this._pokeMap[t][e], this._pokeMap[t][e] = 0, (n = this.findPokemonController(t, e)) && (n.node.runAction(cc.moveBy(c, cc.p(0, o * r * this._blockScale))), n.move(o, 0))
                    }
                }
            },
            moveToBorderHorizontally: function () {
                for (var e = 1; e < this._pokeMapHeight - 1; e++) {
                    for (var t = 2; t <= this._mapCenterLeft; t++) {
                        if (0 != this._pokeMap[e][t]) if (0 != (o = this.countSpace(new l(e, t), 1))) this._pokeMap[e][t + o] = this._pokeMap[e][t], this._pokeMap[e][t] = 0, (n = this.findPokemonController(e, t)) && (n.node.runAction(cc.moveBy(c, cc.p(o * a * this._blockScale, 0))), n.move(0, o))
                    }
                    for (t = this._pokeMapWidth - 2; t >= this._mapCenterRight; t--) {
                        var o, n;
                        if (0 != this._pokeMap[e][t]) if (0 != (o = this.countSpace(new l(e, t), 3))) this._pokeMap[e][t + o] = this._pokeMap[e][t], this._pokeMap[e][t] = 0, (n = this.findPokemonController(e, t)) && (n.node.runAction(cc.moveBy(c, cc.p(o * a * this._blockScale, 0))), n.move(0, o))
                    }
                }
            },
            moveToBorderVertically: function () {
                for (var e = 1; e < this._pokeMapWidth - 1; e++) {
                    for (var t = 2; t <= this._mapCenterBottom; t++) {
                        if (0 != this._pokeMap[t][e]) if (0 != (o = this.countSpace(new l(t, e), 4))) this._pokeMap[t + o][e] = this._pokeMap[t][e], this._pokeMap[t][e] = 0, (n = this.findPokemonController(t, e)) && (n.node.runAction(cc.moveBy(c, cc.p(0, o * r * this._blockScale))), n.move(o, 0))
                    }
                    for (t = this._pokeMapHeight - 3; t >= this._mapCenterTop; t--) {
                        var o, n;
                        if (0 != this._pokeMap[t][e]) if (0 != (o = this.countSpace(new l(t, e), 2))) this._pokeMap[t + o][e] = this._pokeMap[t][e], this._pokeMap[t][e] = 0, (n = this.findPokemonController(t, e)) && (n.node.runAction(cc.moveBy(c, cc.p(0, o * r * this._blockScale))), n.move(o, 0))
                    }
                }
            },
            moveToCenterFromAllDirection: function (e, t) {
                e.getX() == t.getX() ? (this.moveToCenterHorizontally(), this.moveToCenterVertically()) : (this.moveToCenterVertically(), this.moveToCenterHorizontally())
            },
            moveToBorderWithAllDirection: function (e, t) {
                e.getX() == t.getX() ? (this.moveToBorderHorizontally(), this.moveToBorderVertically()) : (this.moveToBorderVertically(), this.moveToBorderHorizontally())
            },
            leftGoDownRightGoUp: function () {
                this.moveDown(1, this._mapCenterLeft), this.moveUp(this._mapCenterRight, this._pokeMapWidth - 2)
            },
            bottomMoveRightTopGoLeft: function () {
                this.moveLeft(this._mapCenterTop, this._pokeMapHeight - 2), this.moveRight(1, this._mapCenterBottom)
            },
            findPokemonController: function (e, t) {
                if (0 == this._listPokemon.length) return null;
                for (var o = 0; o < this._listPokemon.length; o++) if (this._listPokemon[o].Position.getX() == e && this._listPokemon[o].Position.getY() == t) return this._listPokemon[o];
                return null
            },
            saveGame: function () {
                if (this._rebornController.RebornCount < 0 || this._timeBarController.getRemainingTime() < 0) "undefined" == typeof FBInstant ? cc.sys.localStorage.setItem("SaveGamePKM", 0) : FBInstant.player.setDataAsync({SaveGamePKM: 0}); else {
                    for (var e = "", t = 0; t < this._pokeMapHeight; t++) for (var o = 0; o < this._pokeMapWidth; o++) e += this._pokeMap[t][o] + ",";
                    e = e.slice(0, -1), e += ";" + this._rebornController.RebornCount, e += ";" + this._level, e += ";" + this._timeBarController.getRemainingTime(), e += ";" + this._scoreAreaController.Score, e += ";" + this._zeroCount, e += ";" + this._pokeMapHeight, e += ";" + this._pokeMapWidth, e += ";" + this._blockScale.toString(), e += ";" + this._numberOfPokemonSpecies, "undefined" == typeof FBInstant ? (cc.sys.localStorage.setItem("SaveGamePKM", 1), cc.sys.localStorage.setItem("SaveStatePKM", e)) : FBInstant.player.setDataAsync({
                        SaveGamePKM: 1,
                        SaveStatePKM: e
                    }).then(function () {
                        console.log("savegame is set")
                    }).catch(function (e) {
                        console.log("savegame reject ", e)
                    })
                }
            },
            loadGame: function () {
                var o = this;
                if ("undefined" == typeof FBInstant) {
                    if (1 == cc.sys.localStorage.getItem("SaveGamePKM")) {
                        var e = cc.sys.localStorage.getItem("SaveStatePKM");
                        return this.loadSaveState(e), this.showMenu(!1), !0
                    }
                    return this.showMenu(!0), !1
                }
                FBInstant.player.getDataAsync(["SaveGamePKM", "SaveStatePKM"]).then(function (e) {
                    if (void 0 === e.SaveGamePKM) return console.log("new game popup 1"), o.showMenu(!0), !1;
                    if (0 == parseInt(e.SaveGamePKM)) return console.log("new game popup 2"), o.showMenu(!0), !1;
                    console.log("continue game popup");
                    var t = e.SaveStatePKM;
                    return o.loadSaveState(t), o.showMenu(!1), !0
                })
            },
            loadSaveState: function (e) {
                var t = e.split(";");
                this._pokeMapHeight = parseInt(t[6]), this._pokeMapWidth = parseInt(t[7]), this._blockScale = parseFloat(t[8]), this.loadPokeMap(t[0]), this.calculateMapCenterParams(), this.normalMode = 9 == this._pokeMapHeight, this._rebornController.setReborn(parseInt(t[1])), this.setLevel(parseInt(t[2])), this._scoreAreaController.setLevel(this._level), this.initMaxTime(), this._timeBarController.setRemainingTime(parseInt(t[3])), this._scoreAreaController.addScore(parseInt(t[4])), this._zeroCount = parseInt(t[5]), this._numberOfPokemonSpecies = parseInt(t[9]), this._zeroCount == this._pokeMapHeight * this._pokeMapWidth && (this._level++, this.setLevel(this._level), this._scoreAreaController.setLevel(this._level), this._rebornController.RebornCount++, this._rebornController.setReborn(this._rebornController.RebornCount), this.genMap(), this._timeBarController.resetTime())
            },
            loadPokeMap: function (e) {
                var t = e.split(","), o = 0;
                this._pokeMap = [];
                for (var n = 0; n < this._pokeMapHeight; n++) {
                    this._pokeMap[n] = [];
                    for (var i = 0; i < this._pokeMapWidth; i++) this._pokeMap[n].push(parseInt(t[o++]))
                }
            },
            inviteFriends: function () {
                var e = this;
                "undefined" != typeof FBInstant && FBInstant.context.chooseAsync({filters: ["NEW_CONTEXT_ONLY"]}).then(function () {
                    e.updateContext()
                }).catch(function (e) {
                    console.log("choose reject ", e)
                })
            },
            shareFacebook: function () {
                "undefined" != typeof FBInstant && FBInstant.shareAsync({
                    intent: "SHARE",
                    image: this.getImgBase64(this.completeLayer),
                    text: "Mission Completed!",
                    data: {}
                }).then(function () {
                    console.log("share success!")
                })
            },
            shareVictory: function () {
                "undefined" != typeof FBInstant && FBInstant.shareAsync({
                    intent: "SHARE",
                    image: this.getImgBase64(this.victoryLayer),
                    text: "Victory!",
                    data: {}
                }).then(function () {
                    console.log("share success!")
                })
            },
            getImgBase64: function (e) {
                var t = 1136, o = new cc.RenderTexture(t, 640);
                o.begin(), e._sgNode.visit(), o.end();
                var n = document.createElement("canvas"), i = n.getContext("2d");
                if (n.width = t, n.height = 640, cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                    var s = o.getSprite().getTexture().getHtmlElementObj();
                    i.drawImage(s, 0, 0, t, 640)
                } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                    var r = gl.createFramebuffer();
                    gl.bindFramebuffer(gl.FRAMEBUFFER, r);
                    var a = o.getSprite().getTexture()._glID;
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
                    var c = new Uint8Array(2908160);
                    gl.readPixels(0, 0, t, 640, gl.RGBA, gl.UNSIGNED_BYTE, c), gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                    for (var h = 0; h < 640; h++) {
                        var l = 639 - h, p = new Uint8ClampedArray(c.buffer, l * t * 4, 4544),
                            u = new ImageData(p, t, 1);
                        i.putImageData(u, 0, h)
                    }
                }
                return n.toDataURL("image/png")
            },
            updateContext: function () {
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Play Now",
                    template: "invite_play",
                    image: this.getImgBase64(this.banner),
                    text: "Lets play Pikachu with me",
                    data: {},
                    strategy: "IMMEDIATE",
                    notification: "PUSH"
                }).then(function () {
                    console.log("invite success")
                }).catch(function (e) {
                    console.log("invite reject ", e)
                })
            }
        }), cc._RF.pop()
    }, {"./Point.js": "Point", "./StaticVar.js": "StaticVar"}], Point: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a7aeaXlip1Dv4jqf6kbC1+S", "Point");
        var n = function () {
            function n(e, t) {
                for (var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (e, t, o) {
                return t && n(e.prototype, t), o && n(e, o), e
            }
        }();
        var i = function () {
            function o(e, t) {
                (function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                })(this, o), this.X = e, this.Y = t
            }

            return n(o, [{
                key: "getX", value: function () {
                    return this.X
                }
            }, {
                key: "getY", value: function () {
                    return this.Y
                }
            }, {
                key: "setX", value: function (e) {
                    this.X = e
                }
            }, {
                key: "setY", value: function (e) {
                    this.Y = e
                }
            }]), o
        }();
        t.exports = i, cc._RF.pop()
    }, {}], PokemonBlockController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "50202ym5dxMlp76Chf7vuZb", "PokemonBlockController");
        var n = e("./Point.js"), i = e("./StaticVar.js");
        cc.Class({
            extends: cc.Component,
            properties: {Position: null, pokemon: cc.Sprite, bg: cc.Sprite},
            start: function () {
                var t = this;
                this._isTouch = !1, this._pc = this.node.parent.parent.getComponent("PlayController"), this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    t.onTouchDown()
                })
            },
            setPosition: function (e, t) {
                this.Position = new n(e, t)
            },
            move: function (e, t) {
                this.Position = new n(this.Position.getX() + e, this.Position.getY() + t)
            },
            onTouchDown: function () {
                i.Freeze || (this._isTouch = !this._isTouch, this.node.stopAllActions(), this._pc.addTouchedPokemon(this.getComponent("PokemonBlockController")), this._pc.checkTouchedPokemon())
            },
            resetPokemonState: function (e) {
                this.bg.spriteFrame = e, this._isTouch = !1
            },
            setBackgroundPokemon: function (e) {
                this.bg.spriteFrame = e
            },
            setPokemon: function (e) {
                this.pokemon.spriteFrame = e
            },
            reset: function () {
                this._isReset = !0
            },
            suggestAction: function (e, t) {
                var o = [cc.delayTime(.5)];
                o.push(cc.callFunc(this.suggestCallback, this, e)), o.push(cc.delayTime(.5)), o.push(cc.callFunc(this.suggestCallback, this, t)), this.node.runAction(cc.sequence(o).repeatForever())
            },
            suggestCallback: function (e, t) {
                this.bg.spriteFrame = t
            }
        }), cc._RF.pop()
    }, {"./Point.js": "Point", "./StaticVar.js": "StaticVar"}], RebornController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d022f5jHCJO7IOAlavsRFWm", "RebornController");
        var n = null;
        cc.Class({
            extends: cc.Component,
            properties: {
                RebornCount: 10,
                textReborn: cc.Label,
                helpButton: cc.Button,
                helpSprite: cc.Sprite,
                soundButton: cc.Button,
                pauseButton: cc.Button,
                helpSpriteHelp: cc.SpriteFrame,
                helpSpriteHelpDisable: cc.SpriteFrame,
                textTime: cc.Label
            },
            start: function () {
                this.textReborn.string = this.RebornCount.toString(), this.remainingTime = 0
            },
            getRemainTime: function () {
                return this.remainingTime
            },
            setReborn: function (e) {
                this.RebornCount = e, this.textReborn.string = e.toString()
            },
            setPauseState: function () {
                this.helpButton.interactable = !1, this.soundButton.interactable = !1, this.pauseButton.interactable = !1, this.timerCanRun = !1
            },
            setResumeState: function () {
                0 == this.remainingTime && (this.helpButton.interactable = !0), this.soundButton.interactable = !0, this.pauseButton.interactable = !0
            },
            resetSuggest: function () {
                this.remainingTime = 0, this.timerCanRun = !1, this.pauseButton.interactable && (this.helpButton.interactable = !0), this.helpSprite.spriteFrame = this.helpSpriteHelp, this.textTime.string = ""
            },
            suggest: function () {
                this.checkSupportedAds() ? this.remainingTime = 2 : this.remainingTime = 2, this.helpButton.interactable = !1, this.helpSprite.spriteFrame = this.helpSpriteHelpDisable, this.timerCanRun = !0, this.countTimer()
            },
            setHelp: function () {
                this.helpButton.interactable ? this.helpSprite.spriteFrame = this.helpSpriteHelp : this.helpSprite.spriteFrame = this.helpSpriteHelpDisable
            },
            helpPlay: function () {
                this.helpSprite.node.getComponent(cc.Animation).play("Help")
            },
            helpStop: function () {
                this.helpSprite.node.getComponent(cc.Animation).stop("Help"), this.setHelp()
            },
            resumeHelp: function () {
                this.timerCanRun = !0, this.countTimer()
            },
            countTimer: function () {
                this.timerCanRun && (this.remainingTime--, this.textTime.string = this.remainingTime.toString(), 0 < this.remainingTime ? this.scheduleOnce(function () {
                    this.countTimer()
                }, 1) : this.resetSuggest())
            },
            loadInterstitial: function () {
                "undefined" != typeof FBInstant && (n || FBInstant.getInterstitialAdAsync("1043181865796678_1860643804050476").then(function (e) {
                    return (n = e).loadAsync()
                }).then(function () {
                    console.log("Interstitial preloaded A")
                }).catch(function (e) {
                    console.error("Interstitial failed to preload A: " + e.message), FBInstant.logEvent("INTERSTITIAL FAILED TO PRELOAD A", 1), FBInstant.getInterstitialAdAsync("1043181865796678_1714195485361976").then(function (e) {
                        return (n = e).loadAsync()
                    }).then(function () {
                        console.log("Interstitial preloaded B")
                    }).catch(function (e) {
                        console.error("Interstitial failed to preload B: " + e.message)
                    })
                }))
            },
            checkSupportedAds: function () {
                if ("undefined" == typeof FBInstant) return !1;
                var e = FBInstant.getSupportedAPIs();
                return this.showInterstitial(), e.includes("getInterstitialAdAsync")
            },
            showInterstitial: function () {
                var e = this;
                "undefined" != typeof FBInstant && (n ? n.showAsync().then(function () {
                    console.log("Interstitial ad finished successfully"), n = null, e.loadInterstitial()
                }).catch(function (e) {
                    n = null, this.loadInterstitial(), console.error(e.message)
                }) : this.loadInterstitial())
            }
        }), cc._RF.pop()
    }, {}], ScoreAreaController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "24b5fVmHzNKBL/rKoF1TB/p", "ScoreAreaController"), cc.Class({
            extends: cc.Component,
            properties: {Score: 0, textScore: cc.Label, textLevel: cc.Label},
            start: function () {
                this.textScore.string = this.Score.toString()
            },
            addScore: function (e) {
                this.Score += e, this.textScore.string = this.Score.toString()
            },
            updateScore: function (e) {
                var t = this, o = this.Score;
                this.Score += e;
                var n = setInterval(function () {
                    o += 5, t.textScore.string = o.toString(), o >= t.Score && clearInterval(n)
                }, 1)
            },
            scoreUp: function (e) {
                var t = this, o = this.Score, n = this.Score + e;
                this.Score += e;
                var i = Math.floor(666 / e), s = setInterval(function () {
                    o++, t.textScore.string = o.toString(), n <= o && clearInterval(s)
                }, i);
                this.textScore.node.getComponent(cc.Animation).play("scoreUp")
            },
            resetScore: function () {
                this.Score = 0, this.textScore.string = "0"
            },
            setLevel: function (e) {
                this.textLevel.string = "Level " + e
            }
        }), cc._RF.pop()
    }, {}], StaticVar: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b3770JrlSZP/YQEn2a89MQz", "StaticVar");
        var n = function () {
        };
        (t.exports = n).Freeze = !1, n.Sound = !0, cc._RF.pop()
    }, {}], TimeBarController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2ab71730gtGB4J8NZvdmmqz", "TimeBarController");
        var n = null;
        cc.Class({
            extends: cc.Component, properties: {fillBar: cc.Node, playNode: cc.Node}, start: function () {
                this.timerCanRun = !1, this.timeHelp = 20
            }, countTimer: function () {
                this.timerCanRun && (this.remainingTime--, this.timeHelp--, this.updateTimeBar(), this.timeHelp <= 0 && (this.setTimeHelp(), this.playNode.getComponent("PlayController").helpAnim()), 0 < this.remainingTime ? this.scheduleOnce(function () {
                    this.countTimer()
                }, 1) : (this.playNode.getComponent("PlayController").gameOver(), this.timerCanRun = !1))
            }, getTimeHelp: function () {
                return this.timeHelp
            }, setTimeHelp: function () {
                this.timeHelp = 20
            }, resetTime: function () {
                this.remainingTime = this.maxTime, this.timeHelp = 20, this.updateTimeBar()
            }, updateTimeBar: function () {
                this.fillBar.width = 395 * (1 - this.remainingTime / this.maxTime)
            }, startTimer: function () {
                this.timerCanRun = !0
            }, stopTimer: function () {
                this.timerCanRun = !1
            }, resumeTimer: function () {
                this.timerCanRun = !0
            }, setMaxTime: function (e) {
                this.maxTime = 600 * e / 144
            }, getRemainingTime: function () {
                return Math.ceil(this.remainingTime)
            }, getPlayTime: function () {
                return Math.ceil(this.maxTime - this.remainingTime)
            }, setRemainingTime: function (e) {
                this.remainingTime = e, this.timeHelp = 20, this.updateTimeBar()
            }, checkSupportedAPIs: function () {
                return "undefined" != typeof FBInstant && (FBInstant.getSupportedAPIs().includes("getRewardedVideoAsync") && null != n)
            }, loadVideo: function () {
                "undefined" != typeof FBInstant && (n || FBInstant.getRewardedVideoAsync("1043181865796678_1860646150716908").then(function (e) {
                    return (n = e).loadAsync()
                }).then(function () {
                    console.log("Video preloaded A"), FBInstant.logEvent("VIDEO PRELOADED A")
                }).catch(function (e) {
                    n = null, console.error("Video failed to preload A: " + e.message), FBInstant.getRewardedVideoAsync("1043181865796678_1748602998587891").then(function (e) {
                        return (n = e).loadAsync()
                    }).then(function () {
                        FBInstant.logEvent("VIDEO PRELOADED B"), console.log("Video preloaded B")
                    }).catch(function (e) {
                        n = null, console.error("Interstitial failed to preload B: " + e.message)
                    })
                }))
            }, showVideo: function (e, t) {
                var o = this;
                n ? (this.playNode.getComponent("PlayController").stopTimer(), FBInstant.logEvent("SHOW_VIDEO_" + t), n.showAsync().then(function () {
                    o.playNode.getComponent("PlayController").videoRewarded(t), n = null, o.loadVideo()
                }).catch(function (e) {
                    this.playNode.getComponent("PlayController").gameOver1(), n = null, this.loadVideo(), console.error(e.message)
                })) : this.loadVideo()
            }, showVideoBonusScore: function () {
                var e = this;
                n ? (FBInstant.logEvent("SHOW_VIDEO_TIME_BONUS_X2"), n.showAsync().then(function () {
                    e.playNode.getComponent("PlayController").videoBonusScore(e.getRemainingTime()), n = null, e.loadVideo()
                }).catch(function (e) {
                    n = null, this.loadVideo(), console.error(e.message)
                })) : this.loadVideo()
            }
        }), cc._RF.pop()
    }, {}], UserRankingController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "bc5e3RjLLFMD7zf1fpI6mOY", "UserRankingController"), cc.Class({
            extends: cc.Component,
            properties: {labelRank: cc.Label, labelName: cc.Label, labelScore: cc.Label, spriteAvatar: cc.Sprite},
            start: function () {
            },
            setInfo: function (e, t, o, n) {
                var i = this, s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4];
                this.labelRank.string = e.toString(), cc.loader.load(t, function (e, t) {
                    i.spriteAvatar.spriteFrame = new cc.SpriteFrame(t), i.spriteAvatar.node.width = 190, i.spriteAvatar.node.height = 190
                }), this.labelName.string = o, this.labelScore.string = n.toString(), this.setColor(s), this.node.active = !0
            },
            setColor: function (e) {
                if (e) this.labelRank.node.color = cc.Color.WHITE, this.labelName.node.color = cc.Color.WHITE, this.labelScore.node.color = cc.Color.WHITE; else {
                    var t = new cc.Color(244, 232, 0);
                    this.labelRank.node.color = t, this.labelName.node.color = t, this.labelScore.node.color = t
                }
            }
        }), cc._RF.pop()
    }, {}], VictoryLayerController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5ff76UftzlNKbhFoKdA1dTO", "VictoryLayerController"), cc.Class({
            extends: cc.Component,
            properties: {
                labelScore: cc.Label,
                labelBonusScore: cc.Label,
                labelTotalScore: cc.Label,
                labelBestscore: cc.Label
            },
            start: function () {
            },
            setInfo: function (e, t) {
                var o = this;
                this.labelScore.string = "Score: " + e.toString();
                var n = 5 * t, i = 0, s = setInterval(function () {
                    i += 5, o.labelBonusScore.string = "Time Bonus: " + i.toString(), o.labelTotalScore.string = "Total: " + (e + i).toString(), n <= i && clearInterval(s)
                }, 1);
                this.setBestscore(e + n)
            },
            setBestscore: function (t) {
                var o = this;
                "undefined" != typeof FBInstant && FBInstant.player.getDataAsync(["BestScore"]).then(function (e) {
                    void 0 === e.BestScore ? (FBInstant.player.setDataAsync({BestScore: t}), o.labelBestscore.string = "Best score: " + t) : t > parseInt(e.BestScore) ? (FBInstant.player.setDataAsync({BestScore: t}), o.labelBestscore.string = "Best score: " + t) : o.labelBestscore.string = "Best score: " + e.BestScore
                })
            }
        }), cc._RF.pop()
    }, {}], VideoBonusController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6106fTMdv9CgpUcBjEd60ld", "VideoBonusController");
        cc.Class({
            extends: cc.Component, properties: {fillBar: cc.Node, playNode: cc.Node}, start: function () {
            }, updateTimeBar: function () {
                this.fillBar.width = this.remainingTime / this.maxTime * 310
            }, countTimer: function () {
                this.timerCanRun && (this.remainingTime -= .1, this.updateTimeBar(), 0 <= this.remainingTime ? this.scheduleOnce(function () {
                    this.countTimer()
                }, .1) : (this.timerCanRun = !1, this.playNode.getComponent("PlayController").gameOver1()))
            }, stopTimer: function () {
                this.timerCanRun = !1
            }, startTimer: function () {
                0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                this.timerCanRun = !0, this.remainingTime = 8, this.maxTime = 8, this.updateTimeBar(), this.countTimer()
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["CompletedLevelLayerController", "GameOverLayerController", "LeaderboardController", "MenuController", "PlayController", "Point", "PokemonBlockController", "RebornController", "ScoreAreaController", "StaticVar", "TimeBarController", "UserRankingController", "VictoryLayerController", "VideoBonusController"]);