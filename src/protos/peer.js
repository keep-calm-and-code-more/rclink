/*eslint-disable*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rep = $root.rep = (() => {

    /**
     * Namespace rep.
     * @exports rep
     * @namespace
     */
    const rep = {};

    rep.protos = (function() {

        /**
         * Namespace protos.
         * @memberof rep
         * @namespace
         */
        const protos = {};

        protos.Event = (function() {

            /**
             * Properties of an Event.
             * @memberof rep.protos
             * @interface IEvent
             * @property {string|null} [from] Event from
             * @property {string|null} [to] Event to
             * @property {rep.protos.Event.Action|null} [action] Event action
             * @property {rep.protos.IBlock|null} [blk] Event blk
             */

            /**
             * Constructs a new Event.
             * @memberof rep.protos
             * @classdesc Represents an Event.
             * @implements IEvent
             * @constructor
             * @param {rep.protos.IEvent=} [properties] Properties to set
             */
            function Event(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Event from.
             * @member {string} from
             * @memberof rep.protos.Event
             * @instance
             */
            Event.prototype.from = "";

            /**
             * Event to.
             * @member {string} to
             * @memberof rep.protos.Event
             * @instance
             */
            Event.prototype.to = "";

            /**
             * Event action.
             * @member {rep.protos.Event.Action} action
             * @memberof rep.protos.Event
             * @instance
             */
            Event.prototype.action = 0;

            /**
             * Event blk.
             * @member {rep.protos.IBlock|null|undefined} blk
             * @memberof rep.protos.Event
             * @instance
             */
            Event.prototype.blk = null;

            /**
             * Creates a new Event instance using the specified properties.
             * @function create
             * @memberof rep.protos.Event
             * @static
             * @param {rep.protos.IEvent=} [properties] Properties to set
             * @returns {rep.protos.Event} Event instance
             */
            Event.create = function create(properties) {
                return new Event(properties);
            };

            /**
             * Encodes the specified Event message. Does not implicitly {@link rep.protos.Event.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Event
             * @static
             * @param {rep.protos.IEvent} message Event message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Event.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.from != null && message.hasOwnProperty("from"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.from);
                if (message.to != null && message.hasOwnProperty("to"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.to);
                if (message.action != null && message.hasOwnProperty("action"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.action);
                if (message.blk != null && message.hasOwnProperty("blk"))
                    $root.rep.protos.Block.encode(message.blk, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Event message, length delimited. Does not implicitly {@link rep.protos.Event.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Event
             * @static
             * @param {rep.protos.IEvent} message Event message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Event.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Event message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Event
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Event} Event
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Event.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Event();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.from = reader.string();
                        break;
                    case 2:
                        message.to = reader.string();
                        break;
                    case 3:
                        message.action = reader.int32();
                        break;
                    case 4:
                        message.blk = $root.rep.protos.Block.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Event message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Event
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Event} Event
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Event.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Event message.
             * @function verify
             * @memberof rep.protos.Event
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Event.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.from != null && message.hasOwnProperty("from"))
                    if (!$util.isString(message.from))
                        return "from: string expected";
                if (message.to != null && message.hasOwnProperty("to"))
                    if (!$util.isString(message.to))
                        return "to: string expected";
                if (message.action != null && message.hasOwnProperty("action"))
                    switch (message.action) {
                    default:
                        return "action: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        break;
                    }
                if (message.blk != null && message.hasOwnProperty("blk")) {
                    let error = $root.rep.protos.Block.verify(message.blk);
                    if (error)
                        return "blk." + error;
                }
                return null;
            };

            /**
             * Creates an Event message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Event
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Event} Event
             */
            Event.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Event)
                    return object;
                let message = new $root.rep.protos.Event();
                if (object.from != null)
                    message.from = String(object.from);
                if (object.to != null)
                    message.to = String(object.to);
                switch (object.action) {
                case "SUBSCRIBE_TOPIC":
                case 0:
                    message.action = 0;
                    break;
                case "TRANSACTION":
                case 1:
                    message.action = 1;
                    break;
                case "BLOCK_NEW":
                case 2:
                    message.action = 2;
                    break;
                case "BLOCK_ENDORSEMENT":
                case 3:
                    message.action = 3;
                    break;
                case "ENDORSEMENT":
                case 4:
                    message.action = 4;
                    break;
                case "MEMBER_UP":
                case 5:
                    message.action = 5;
                    break;
                case "MEMBER_DOWN":
                case 6:
                    message.action = 6;
                    break;
                case "CANDIDATOR":
                case 7:
                    message.action = 7;
                    break;
                case "GENESIS_BLOCK":
                case 8:
                    message.action = 8;
                    break;
                case "BLOCK_SYNC":
                case 9:
                    message.action = 9;
                    break;
                case "BLOCK_SYNC_DATA":
                case 10:
                    message.action = 10;
                    break;
                case "BLOCK_SYNC_SUC":
                case 11:
                    message.action = 11;
                    break;
                }
                if (object.blk != null) {
                    if (typeof object.blk !== "object")
                        throw TypeError(".rep.protos.Event.blk: object expected");
                    message.blk = $root.rep.protos.Block.fromObject(object.blk);
                }
                return message;
            };

            /**
             * Creates a plain object from an Event message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Event
             * @static
             * @param {rep.protos.Event} message Event
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Event.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.from = "";
                    object.to = "";
                    object.action = options.enums === String ? "SUBSCRIBE_TOPIC" : 0;
                    object.blk = null;
                }
                if (message.from != null && message.hasOwnProperty("from"))
                    object.from = message.from;
                if (message.to != null && message.hasOwnProperty("to"))
                    object.to = message.to;
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = options.enums === String ? $root.rep.protos.Event.Action[message.action] : message.action;
                if (message.blk != null && message.hasOwnProperty("blk"))
                    object.blk = $root.rep.protos.Block.toObject(message.blk, options);
                return object;
            };

            /**
             * Converts this Event to JSON.
             * @function toJSON
             * @memberof rep.protos.Event
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Event.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Action enum.
             * @name rep.protos.Event.Action
             * @enum {string}
             * @property {number} SUBSCRIBE_TOPIC=0 SUBSCRIBE_TOPIC value
             * @property {number} TRANSACTION=1 TRANSACTION value
             * @property {number} BLOCK_NEW=2 BLOCK_NEW value
             * @property {number} BLOCK_ENDORSEMENT=3 BLOCK_ENDORSEMENT value
             * @property {number} ENDORSEMENT=4 ENDORSEMENT value
             * @property {number} MEMBER_UP=5 MEMBER_UP value
             * @property {number} MEMBER_DOWN=6 MEMBER_DOWN value
             * @property {number} CANDIDATOR=7 CANDIDATOR value
             * @property {number} GENESIS_BLOCK=8 GENESIS_BLOCK value
             * @property {number} BLOCK_SYNC=9 BLOCK_SYNC value
             * @property {number} BLOCK_SYNC_DATA=10 BLOCK_SYNC_DATA value
             * @property {number} BLOCK_SYNC_SUC=11 BLOCK_SYNC_SUC value
             */
            Event.Action = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SUBSCRIBE_TOPIC"] = 0;
                values[valuesById[1] = "TRANSACTION"] = 1;
                values[valuesById[2] = "BLOCK_NEW"] = 2;
                values[valuesById[3] = "BLOCK_ENDORSEMENT"] = 3;
                values[valuesById[4] = "ENDORSEMENT"] = 4;
                values[valuesById[5] = "MEMBER_UP"] = 5;
                values[valuesById[6] = "MEMBER_DOWN"] = 6;
                values[valuesById[7] = "CANDIDATOR"] = 7;
                values[valuesById[8] = "GENESIS_BLOCK"] = 8;
                values[valuesById[9] = "BLOCK_SYNC"] = 9;
                values[valuesById[10] = "BLOCK_SYNC_DATA"] = 10;
                values[valuesById[11] = "BLOCK_SYNC_SUC"] = 11;
                return values;
            })();

            return Event;
        })();

        protos.Signer = (function() {

            /**
             * Properties of a Signer.
             * @memberof rep.protos
             * @interface ISigner
             * @property {string|null} [name] Signer name
             * @property {string|null} [creditCode] Signer creditCode
             * @property {string|null} [mobile] Signer mobile
             * @property {Array.<string>|null} [certNames] Signer certNames
             */

            /**
             * Constructs a new Signer.
             * @memberof rep.protos
             * @classdesc Represents a Signer.
             * @implements ISigner
             * @constructor
             * @param {rep.protos.ISigner=} [properties] Properties to set
             */
            function Signer(properties) {
                this.certNames = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Signer name.
             * @member {string} name
             * @memberof rep.protos.Signer
             * @instance
             */
            Signer.prototype.name = "";

            /**
             * Signer creditCode.
             * @member {string} creditCode
             * @memberof rep.protos.Signer
             * @instance
             */
            Signer.prototype.creditCode = "";

            /**
             * Signer mobile.
             * @member {string} mobile
             * @memberof rep.protos.Signer
             * @instance
             */
            Signer.prototype.mobile = "";

            /**
             * Signer certNames.
             * @member {Array.<string>} certNames
             * @memberof rep.protos.Signer
             * @instance
             */
            Signer.prototype.certNames = $util.emptyArray;

            /**
             * Creates a new Signer instance using the specified properties.
             * @function create
             * @memberof rep.protos.Signer
             * @static
             * @param {rep.protos.ISigner=} [properties] Properties to set
             * @returns {rep.protos.Signer} Signer instance
             */
            Signer.create = function create(properties) {
                return new Signer(properties);
            };

            /**
             * Encodes the specified Signer message. Does not implicitly {@link rep.protos.Signer.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Signer
             * @static
             * @param {rep.protos.ISigner} message Signer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.creditCode);
                if (message.mobile != null && message.hasOwnProperty("mobile"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.mobile);
                if (message.certNames != null && message.certNames.length)
                    for (let i = 0; i < message.certNames.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.certNames[i]);
                return writer;
            };

            /**
             * Encodes the specified Signer message, length delimited. Does not implicitly {@link rep.protos.Signer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Signer
             * @static
             * @param {rep.protos.ISigner} message Signer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Signer message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Signer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Signer} Signer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Signer();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.creditCode = reader.string();
                        break;
                    case 3:
                        message.mobile = reader.string();
                        break;
                    case 4:
                        if (!(message.certNames && message.certNames.length))
                            message.certNames = [];
                        message.certNames.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Signer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Signer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Signer} Signer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Signer message.
             * @function verify
             * @memberof rep.protos.Signer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Signer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    if (!$util.isString(message.creditCode))
                        return "creditCode: string expected";
                if (message.mobile != null && message.hasOwnProperty("mobile"))
                    if (!$util.isString(message.mobile))
                        return "mobile: string expected";
                if (message.certNames != null && message.hasOwnProperty("certNames")) {
                    if (!Array.isArray(message.certNames))
                        return "certNames: array expected";
                    for (let i = 0; i < message.certNames.length; ++i)
                        if (!$util.isString(message.certNames[i]))
                            return "certNames: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Signer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Signer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Signer} Signer
             */
            Signer.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Signer)
                    return object;
                let message = new $root.rep.protos.Signer();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.creditCode != null)
                    message.creditCode = String(object.creditCode);
                if (object.mobile != null)
                    message.mobile = String(object.mobile);
                if (object.certNames) {
                    if (!Array.isArray(object.certNames))
                        throw TypeError(".rep.protos.Signer.certNames: array expected");
                    message.certNames = [];
                    for (let i = 0; i < object.certNames.length; ++i)
                        message.certNames[i] = String(object.certNames[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Signer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Signer
             * @static
             * @param {rep.protos.Signer} message Signer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Signer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.certNames = [];
                if (options.defaults) {
                    object.name = "";
                    object.creditCode = "";
                    object.mobile = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    object.creditCode = message.creditCode;
                if (message.mobile != null && message.hasOwnProperty("mobile"))
                    object.mobile = message.mobile;
                if (message.certNames && message.certNames.length) {
                    object.certNames = [];
                    for (let j = 0; j < message.certNames.length; ++j)
                        object.certNames[j] = message.certNames[j];
                }
                return object;
            };

            /**
             * Converts this Signer to JSON.
             * @function toJSON
             * @memberof rep.protos.Signer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Signer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Signer;
        })();

        protos.CertId = (function() {

            /**
             * Properties of a CertId.
             * @memberof rep.protos
             * @interface ICertId
             * @property {string|null} [creditCode] CertId creditCode
             * @property {string|null} [certName] CertId certName
             */

            /**
             * Constructs a new CertId.
             * @memberof rep.protos
             * @classdesc Represents a CertId.
             * @implements ICertId
             * @constructor
             * @param {rep.protos.ICertId=} [properties] Properties to set
             */
            function CertId(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CertId creditCode.
             * @member {string} creditCode
             * @memberof rep.protos.CertId
             * @instance
             */
            CertId.prototype.creditCode = "";

            /**
             * CertId certName.
             * @member {string} certName
             * @memberof rep.protos.CertId
             * @instance
             */
            CertId.prototype.certName = "";

            /**
             * Creates a new CertId instance using the specified properties.
             * @function create
             * @memberof rep.protos.CertId
             * @static
             * @param {rep.protos.ICertId=} [properties] Properties to set
             * @returns {rep.protos.CertId} CertId instance
             */
            CertId.create = function create(properties) {
                return new CertId(properties);
            };

            /**
             * Encodes the specified CertId message. Does not implicitly {@link rep.protos.CertId.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.CertId
             * @static
             * @param {rep.protos.ICertId} message CertId message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CertId.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.creditCode);
                if (message.certName != null && message.hasOwnProperty("certName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.certName);
                return writer;
            };

            /**
             * Encodes the specified CertId message, length delimited. Does not implicitly {@link rep.protos.CertId.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.CertId
             * @static
             * @param {rep.protos.ICertId} message CertId message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CertId.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CertId message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.CertId
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.CertId} CertId
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CertId.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.CertId();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.creditCode = reader.string();
                        break;
                    case 2:
                        message.certName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CertId message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.CertId
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.CertId} CertId
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CertId.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CertId message.
             * @function verify
             * @memberof rep.protos.CertId
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CertId.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    if (!$util.isString(message.creditCode))
                        return "creditCode: string expected";
                if (message.certName != null && message.hasOwnProperty("certName"))
                    if (!$util.isString(message.certName))
                        return "certName: string expected";
                return null;
            };

            /**
             * Creates a CertId message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.CertId
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.CertId} CertId
             */
            CertId.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.CertId)
                    return object;
                let message = new $root.rep.protos.CertId();
                if (object.creditCode != null)
                    message.creditCode = String(object.creditCode);
                if (object.certName != null)
                    message.certName = String(object.certName);
                return message;
            };

            /**
             * Creates a plain object from a CertId message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.CertId
             * @static
             * @param {rep.protos.CertId} message CertId
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CertId.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.creditCode = "";
                    object.certName = "";
                }
                if (message.creditCode != null && message.hasOwnProperty("creditCode"))
                    object.creditCode = message.creditCode;
                if (message.certName != null && message.hasOwnProperty("certName"))
                    object.certName = message.certName;
                return object;
            };

            /**
             * Converts this CertId to JSON.
             * @function toJSON
             * @memberof rep.protos.CertId
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CertId.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CertId;
        })();

        protos.Certificate = (function() {

            /**
             * Properties of a Certificate.
             * @memberof rep.protos
             * @interface ICertificate
             * @property {string|null} [certificate] Certificate certificate
             * @property {string|null} [algType] Certificate algType
             * @property {boolean|null} [certValid] Certificate certValid
             * @property {google.protobuf.ITimestamp|null} [reg_Time] Certificate reg_Time
             * @property {google.protobuf.ITimestamp|null} [unreg_Time] Certificate unreg_Time
             */

            /**
             * Constructs a new Certificate.
             * @memberof rep.protos
             * @classdesc Represents a Certificate.
             * @implements ICertificate
             * @constructor
             * @param {rep.protos.ICertificate=} [properties] Properties to set
             */
            function Certificate(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Certificate certificate.
             * @member {string} certificate
             * @memberof rep.protos.Certificate
             * @instance
             */
            Certificate.prototype.certificate = "";

            /**
             * Certificate algType.
             * @member {string} algType
             * @memberof rep.protos.Certificate
             * @instance
             */
            Certificate.prototype.algType = "";

            /**
             * Certificate certValid.
             * @member {boolean} certValid
             * @memberof rep.protos.Certificate
             * @instance
             */
            Certificate.prototype.certValid = false;

            /**
             * Certificate reg_Time.
             * @member {google.protobuf.ITimestamp|null|undefined} reg_Time
             * @memberof rep.protos.Certificate
             * @instance
             */
            Certificate.prototype.reg_Time = null;

            /**
             * Certificate unreg_Time.
             * @member {google.protobuf.ITimestamp|null|undefined} unreg_Time
             * @memberof rep.protos.Certificate
             * @instance
             */
            Certificate.prototype.unreg_Time = null;

            /**
             * Creates a new Certificate instance using the specified properties.
             * @function create
             * @memberof rep.protos.Certificate
             * @static
             * @param {rep.protos.ICertificate=} [properties] Properties to set
             * @returns {rep.protos.Certificate} Certificate instance
             */
            Certificate.create = function create(properties) {
                return new Certificate(properties);
            };

            /**
             * Encodes the specified Certificate message. Does not implicitly {@link rep.protos.Certificate.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Certificate
             * @static
             * @param {rep.protos.ICertificate} message Certificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Certificate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.certificate != null && message.hasOwnProperty("certificate"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.certificate);
                if (message.algType != null && message.hasOwnProperty("algType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.algType);
                if (message.certValid != null && message.hasOwnProperty("certValid"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.certValid);
                if (message.reg_Time != null && message.hasOwnProperty("reg_Time"))
                    $root.google.protobuf.Timestamp.encode(message.reg_Time, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.unreg_Time != null && message.hasOwnProperty("unreg_Time"))
                    $root.google.protobuf.Timestamp.encode(message.unreg_Time, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Certificate message, length delimited. Does not implicitly {@link rep.protos.Certificate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Certificate
             * @static
             * @param {rep.protos.ICertificate} message Certificate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Certificate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Certificate message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Certificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Certificate} Certificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Certificate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Certificate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.certificate = reader.string();
                        break;
                    case 2:
                        message.algType = reader.string();
                        break;
                    case 3:
                        message.certValid = reader.bool();
                        break;
                    case 4:
                        message.reg_Time = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.unreg_Time = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Certificate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Certificate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Certificate} Certificate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Certificate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Certificate message.
             * @function verify
             * @memberof rep.protos.Certificate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Certificate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.certificate != null && message.hasOwnProperty("certificate"))
                    if (!$util.isString(message.certificate))
                        return "certificate: string expected";
                if (message.algType != null && message.hasOwnProperty("algType"))
                    if (!$util.isString(message.algType))
                        return "algType: string expected";
                if (message.certValid != null && message.hasOwnProperty("certValid"))
                    if (typeof message.certValid !== "boolean")
                        return "certValid: boolean expected";
                if (message.reg_Time != null && message.hasOwnProperty("reg_Time")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.reg_Time);
                    if (error)
                        return "reg_Time." + error;
                }
                if (message.unreg_Time != null && message.hasOwnProperty("unreg_Time")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.unreg_Time);
                    if (error)
                        return "unreg_Time." + error;
                }
                return null;
            };

            /**
             * Creates a Certificate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Certificate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Certificate} Certificate
             */
            Certificate.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Certificate)
                    return object;
                let message = new $root.rep.protos.Certificate();
                if (object.certificate != null)
                    message.certificate = String(object.certificate);
                if (object.algType != null)
                    message.algType = String(object.algType);
                if (object.certValid != null)
                    message.certValid = Boolean(object.certValid);
                if (object.reg_Time != null) {
                    if (typeof object.reg_Time !== "object")
                        throw TypeError(".rep.protos.Certificate.reg_Time: object expected");
                    message.reg_Time = $root.google.protobuf.Timestamp.fromObject(object.reg_Time);
                }
                if (object.unreg_Time != null) {
                    if (typeof object.unreg_Time !== "object")
                        throw TypeError(".rep.protos.Certificate.unreg_Time: object expected");
                    message.unreg_Time = $root.google.protobuf.Timestamp.fromObject(object.unreg_Time);
                }
                return message;
            };

            /**
             * Creates a plain object from a Certificate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Certificate
             * @static
             * @param {rep.protos.Certificate} message Certificate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Certificate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.certificate = "";
                    object.algType = "";
                    object.certValid = false;
                    object.reg_Time = null;
                    object.unreg_Time = null;
                }
                if (message.certificate != null && message.hasOwnProperty("certificate"))
                    object.certificate = message.certificate;
                if (message.algType != null && message.hasOwnProperty("algType"))
                    object.algType = message.algType;
                if (message.certValid != null && message.hasOwnProperty("certValid"))
                    object.certValid = message.certValid;
                if (message.reg_Time != null && message.hasOwnProperty("reg_Time"))
                    object.reg_Time = $root.google.protobuf.Timestamp.toObject(message.reg_Time, options);
                if (message.unreg_Time != null && message.hasOwnProperty("unreg_Time"))
                    object.unreg_Time = $root.google.protobuf.Timestamp.toObject(message.unreg_Time, options);
                return object;
            };

            /**
             * Converts this Certificate to JSON.
             * @function toJSON
             * @memberof rep.protos.Certificate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Certificate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Certificate;
        })();

        protos.Signature = (function() {

            /**
             * Properties of a Signature.
             * @memberof rep.protos
             * @interface ISignature
             * @property {rep.protos.ICertId|null} [certId] Signature certId
             * @property {google.protobuf.ITimestamp|null} [tmLocal] Signature tmLocal
             * @property {Uint8Array|null} [signature] Signature signature
             */

            /**
             * Constructs a new Signature.
             * @memberof rep.protos
             * @classdesc Represents a Signature.
             * @implements ISignature
             * @constructor
             * @param {rep.protos.ISignature=} [properties] Properties to set
             */
            function Signature(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Signature certId.
             * @member {rep.protos.ICertId|null|undefined} certId
             * @memberof rep.protos.Signature
             * @instance
             */
            Signature.prototype.certId = null;

            /**
             * Signature tmLocal.
             * @member {google.protobuf.ITimestamp|null|undefined} tmLocal
             * @memberof rep.protos.Signature
             * @instance
             */
            Signature.prototype.tmLocal = null;

            /**
             * Signature signature.
             * @member {Uint8Array} signature
             * @memberof rep.protos.Signature
             * @instance
             */
            Signature.prototype.signature = $util.newBuffer([]);

            /**
             * Creates a new Signature instance using the specified properties.
             * @function create
             * @memberof rep.protos.Signature
             * @static
             * @param {rep.protos.ISignature=} [properties] Properties to set
             * @returns {rep.protos.Signature} Signature instance
             */
            Signature.create = function create(properties) {
                return new Signature(properties);
            };

            /**
             * Encodes the specified Signature message. Does not implicitly {@link rep.protos.Signature.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Signature
             * @static
             * @param {rep.protos.ISignature} message Signature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.certId != null && message.hasOwnProperty("certId"))
                    $root.rep.protos.CertId.encode(message.certId, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.tmLocal != null && message.hasOwnProperty("tmLocal"))
                    $root.google.protobuf.Timestamp.encode(message.tmLocal, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signature);
                return writer;
            };

            /**
             * Encodes the specified Signature message, length delimited. Does not implicitly {@link rep.protos.Signature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Signature
             * @static
             * @param {rep.protos.ISignature} message Signature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Signature message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Signature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Signature} Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Signature();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.certId = $root.rep.protos.CertId.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.tmLocal = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.signature = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Signature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Signature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Signature} Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Signature message.
             * @function verify
             * @memberof rep.protos.Signature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Signature.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.certId != null && message.hasOwnProperty("certId")) {
                    let error = $root.rep.protos.CertId.verify(message.certId);
                    if (error)
                        return "certId." + error;
                }
                if (message.tmLocal != null && message.hasOwnProperty("tmLocal")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.tmLocal);
                    if (error)
                        return "tmLocal." + error;
                }
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
                return null;
            };

            /**
             * Creates a Signature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Signature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Signature} Signature
             */
            Signature.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Signature)
                    return object;
                let message = new $root.rep.protos.Signature();
                if (object.certId != null) {
                    if (typeof object.certId !== "object")
                        throw TypeError(".rep.protos.Signature.certId: object expected");
                    message.certId = $root.rep.protos.CertId.fromObject(object.certId);
                }
                if (object.tmLocal != null) {
                    if (typeof object.tmLocal !== "object")
                        throw TypeError(".rep.protos.Signature.tmLocal: object expected");
                    message.tmLocal = $root.google.protobuf.Timestamp.fromObject(object.tmLocal);
                }
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length)
                        message.signature = object.signature;
                return message;
            };

            /**
             * Creates a plain object from a Signature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Signature
             * @static
             * @param {rep.protos.Signature} message Signature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Signature.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.certId = null;
                    object.tmLocal = null;
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                }
                if (message.certId != null && message.hasOwnProperty("certId"))
                    object.certId = $root.rep.protos.CertId.toObject(message.certId, options);
                if (message.tmLocal != null && message.hasOwnProperty("tmLocal"))
                    object.tmLocal = $root.google.protobuf.Timestamp.toObject(message.tmLocal, options);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                return object;
            };

            /**
             * Converts this Signature to JSON.
             * @function toJSON
             * @memberof rep.protos.Signature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Signature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Signature;
        })();

        protos.ChaincodeInput = (function() {

            /**
             * Properties of a ChaincodeInput.
             * @memberof rep.protos
             * @interface IChaincodeInput
             * @property {string|null} ["function"] ChaincodeInput function
             * @property {Array.<string>|null} [args] ChaincodeInput args
             */

            /**
             * Constructs a new ChaincodeInput.
             * @memberof rep.protos
             * @classdesc Represents a ChaincodeInput.
             * @implements IChaincodeInput
             * @constructor
             * @param {rep.protos.IChaincodeInput=} [properties] Properties to set
             */
            function ChaincodeInput(properties) {
                this.args = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChaincodeInput function.
             * @member {string} function
             * @memberof rep.protos.ChaincodeInput
             * @instance
             */
            ChaincodeInput.prototype["function"] = "";

            /**
             * ChaincodeInput args.
             * @member {Array.<string>} args
             * @memberof rep.protos.ChaincodeInput
             * @instance
             */
            ChaincodeInput.prototype.args = $util.emptyArray;

            /**
             * Creates a new ChaincodeInput instance using the specified properties.
             * @function create
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {rep.protos.IChaincodeInput=} [properties] Properties to set
             * @returns {rep.protos.ChaincodeInput} ChaincodeInput instance
             */
            ChaincodeInput.create = function create(properties) {
                return new ChaincodeInput(properties);
            };

            /**
             * Encodes the specified ChaincodeInput message. Does not implicitly {@link rep.protos.ChaincodeInput.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {rep.protos.IChaincodeInput} message ChaincodeInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeInput.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message["function"] != null && message.hasOwnProperty("function"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message["function"]);
                if (message.args != null && message.args.length)
                    for (let i = 0; i < message.args.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.args[i]);
                return writer;
            };

            /**
             * Encodes the specified ChaincodeInput message, length delimited. Does not implicitly {@link rep.protos.ChaincodeInput.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {rep.protos.IChaincodeInput} message ChaincodeInput message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeInput.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChaincodeInput message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ChaincodeInput} ChaincodeInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeInput.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ChaincodeInput();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message["function"] = reader.string();
                        break;
                    case 2:
                        if (!(message.args && message.args.length))
                            message.args = [];
                        message.args.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChaincodeInput message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ChaincodeInput} ChaincodeInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeInput.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChaincodeInput message.
             * @function verify
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChaincodeInput.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message["function"] != null && message.hasOwnProperty("function"))
                    if (!$util.isString(message["function"]))
                        return "function: string expected";
                if (message.args != null && message.hasOwnProperty("args")) {
                    if (!Array.isArray(message.args))
                        return "args: array expected";
                    for (let i = 0; i < message.args.length; ++i)
                        if (!$util.isString(message.args[i]))
                            return "args: string[] expected";
                }
                return null;
            };

            /**
             * Creates a ChaincodeInput message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ChaincodeInput} ChaincodeInput
             */
            ChaincodeInput.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ChaincodeInput)
                    return object;
                let message = new $root.rep.protos.ChaincodeInput();
                if (object["function"] != null)
                    message["function"] = String(object["function"]);
                if (object.args) {
                    if (!Array.isArray(object.args))
                        throw TypeError(".rep.protos.ChaincodeInput.args: array expected");
                    message.args = [];
                    for (let i = 0; i < object.args.length; ++i)
                        message.args[i] = String(object.args[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a ChaincodeInput message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ChaincodeInput
             * @static
             * @param {rep.protos.ChaincodeInput} message ChaincodeInput
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChaincodeInput.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.args = [];
                if (options.defaults)
                    object["function"] = "";
                if (message["function"] != null && message.hasOwnProperty("function"))
                    object["function"] = message["function"];
                if (message.args && message.args.length) {
                    object.args = [];
                    for (let j = 0; j < message.args.length; ++j)
                        object.args[j] = message.args[j];
                }
                return object;
            };

            /**
             * Converts this ChaincodeInput to JSON.
             * @function toJSON
             * @memberof rep.protos.ChaincodeInput
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChaincodeInput.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChaincodeInput;
        })();

        protos.ChaincodeId = (function() {

            /**
             * Properties of a ChaincodeId.
             * @memberof rep.protos
             * @interface IChaincodeId
             * @property {string|null} [chaincodeName] ChaincodeId chaincodeName
             * @property {number|null} [version] ChaincodeId version
             */

            /**
             * Constructs a new ChaincodeId.
             * @memberof rep.protos
             * @classdesc Represents a ChaincodeId.
             * @implements IChaincodeId
             * @constructor
             * @param {rep.protos.IChaincodeId=} [properties] Properties to set
             */
            function ChaincodeId(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChaincodeId chaincodeName.
             * @member {string} chaincodeName
             * @memberof rep.protos.ChaincodeId
             * @instance
             */
            ChaincodeId.prototype.chaincodeName = "";

            /**
             * ChaincodeId version.
             * @member {number} version
             * @memberof rep.protos.ChaincodeId
             * @instance
             */
            ChaincodeId.prototype.version = 0;

            /**
             * Creates a new ChaincodeId instance using the specified properties.
             * @function create
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {rep.protos.IChaincodeId=} [properties] Properties to set
             * @returns {rep.protos.ChaincodeId} ChaincodeId instance
             */
            ChaincodeId.create = function create(properties) {
                return new ChaincodeId(properties);
            };

            /**
             * Encodes the specified ChaincodeId message. Does not implicitly {@link rep.protos.ChaincodeId.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {rep.protos.IChaincodeId} message ChaincodeId message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeId.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chaincodeName != null && message.hasOwnProperty("chaincodeName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.chaincodeName);
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.version);
                return writer;
            };

            /**
             * Encodes the specified ChaincodeId message, length delimited. Does not implicitly {@link rep.protos.ChaincodeId.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {rep.protos.IChaincodeId} message ChaincodeId message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeId.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChaincodeId message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ChaincodeId} ChaincodeId
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeId.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ChaincodeId();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.chaincodeName = reader.string();
                        break;
                    case 2:
                        message.version = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChaincodeId message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ChaincodeId} ChaincodeId
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeId.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChaincodeId message.
             * @function verify
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChaincodeId.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.chaincodeName != null && message.hasOwnProperty("chaincodeName"))
                    if (!$util.isString(message.chaincodeName))
                        return "chaincodeName: string expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                return null;
            };

            /**
             * Creates a ChaincodeId message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ChaincodeId} ChaincodeId
             */
            ChaincodeId.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ChaincodeId)
                    return object;
                let message = new $root.rep.protos.ChaincodeId();
                if (object.chaincodeName != null)
                    message.chaincodeName = String(object.chaincodeName);
                if (object.version != null)
                    message.version = object.version | 0;
                return message;
            };

            /**
             * Creates a plain object from a ChaincodeId message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ChaincodeId
             * @static
             * @param {rep.protos.ChaincodeId} message ChaincodeId
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChaincodeId.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.chaincodeName = "";
                    object.version = 0;
                }
                if (message.chaincodeName != null && message.hasOwnProperty("chaincodeName"))
                    object.chaincodeName = message.chaincodeName;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                return object;
            };

            /**
             * Converts this ChaincodeId to JSON.
             * @function toJSON
             * @memberof rep.protos.ChaincodeId
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChaincodeId.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChaincodeId;
        })();

        protos.ChaincodeDeploy = (function() {

            /**
             * Properties of a ChaincodeDeploy.
             * @memberof rep.protos
             * @interface IChaincodeDeploy
             * @property {number|null} [timeout] ChaincodeDeploy timeout
             * @property {string|null} [codePackage] ChaincodeDeploy codePackage
             * @property {string|null} [legalProse] ChaincodeDeploy legalProse
             * @property {rep.protos.ChaincodeDeploy.CodeType|null} [ctype] ChaincodeDeploy ctype
             */

            /**
             * Constructs a new ChaincodeDeploy.
             * @memberof rep.protos
             * @classdesc Represents a ChaincodeDeploy.
             * @implements IChaincodeDeploy
             * @constructor
             * @param {rep.protos.IChaincodeDeploy=} [properties] Properties to set
             */
            function ChaincodeDeploy(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChaincodeDeploy timeout.
             * @member {number} timeout
             * @memberof rep.protos.ChaincodeDeploy
             * @instance
             */
            ChaincodeDeploy.prototype.timeout = 0;

            /**
             * ChaincodeDeploy codePackage.
             * @member {string} codePackage
             * @memberof rep.protos.ChaincodeDeploy
             * @instance
             */
            ChaincodeDeploy.prototype.codePackage = "";

            /**
             * ChaincodeDeploy legalProse.
             * @member {string} legalProse
             * @memberof rep.protos.ChaincodeDeploy
             * @instance
             */
            ChaincodeDeploy.prototype.legalProse = "";

            /**
             * ChaincodeDeploy ctype.
             * @member {rep.protos.ChaincodeDeploy.CodeType} ctype
             * @memberof rep.protos.ChaincodeDeploy
             * @instance
             */
            ChaincodeDeploy.prototype.ctype = 0;

            /**
             * Creates a new ChaincodeDeploy instance using the specified properties.
             * @function create
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {rep.protos.IChaincodeDeploy=} [properties] Properties to set
             * @returns {rep.protos.ChaincodeDeploy} ChaincodeDeploy instance
             */
            ChaincodeDeploy.create = function create(properties) {
                return new ChaincodeDeploy(properties);
            };

            /**
             * Encodes the specified ChaincodeDeploy message. Does not implicitly {@link rep.protos.ChaincodeDeploy.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {rep.protos.IChaincodeDeploy} message ChaincodeDeploy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeDeploy.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.timeout);
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.codePackage);
                if (message.legalProse != null && message.hasOwnProperty("legalProse"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.legalProse);
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ctype);
                return writer;
            };

            /**
             * Encodes the specified ChaincodeDeploy message, length delimited. Does not implicitly {@link rep.protos.ChaincodeDeploy.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {rep.protos.IChaincodeDeploy} message ChaincodeDeploy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeDeploy.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChaincodeDeploy message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ChaincodeDeploy} ChaincodeDeploy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeDeploy.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ChaincodeDeploy();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.timeout = reader.int32();
                        break;
                    case 2:
                        message.codePackage = reader.string();
                        break;
                    case 3:
                        message.legalProse = reader.string();
                        break;
                    case 4:
                        message.ctype = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChaincodeDeploy message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ChaincodeDeploy} ChaincodeDeploy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeDeploy.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChaincodeDeploy message.
             * @function verify
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChaincodeDeploy.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    if (!$util.isInteger(message.timeout))
                        return "timeout: integer expected";
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    if (!$util.isString(message.codePackage))
                        return "codePackage: string expected";
                if (message.legalProse != null && message.hasOwnProperty("legalProse"))
                    if (!$util.isString(message.legalProse))
                        return "legalProse: string expected";
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    switch (message.ctype) {
                    default:
                        return "ctype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };

            /**
             * Creates a ChaincodeDeploy message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ChaincodeDeploy} ChaincodeDeploy
             */
            ChaincodeDeploy.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ChaincodeDeploy)
                    return object;
                let message = new $root.rep.protos.ChaincodeDeploy();
                if (object.timeout != null)
                    message.timeout = object.timeout | 0;
                if (object.codePackage != null)
                    message.codePackage = String(object.codePackage);
                if (object.legalProse != null)
                    message.legalProse = String(object.legalProse);
                switch (object.ctype) {
                case "CODE_UNDEFINED":
                case 0:
                    message.ctype = 0;
                    break;
                case "CODE_JAVASCRIPT":
                case 1:
                    message.ctype = 1;
                    break;
                case "CODE_SCALA":
                case 2:
                    message.ctype = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a ChaincodeDeploy message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ChaincodeDeploy
             * @static
             * @param {rep.protos.ChaincodeDeploy} message ChaincodeDeploy
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChaincodeDeploy.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.timeout = 0;
                    object.codePackage = "";
                    object.legalProse = "";
                    object.ctype = options.enums === String ? "CODE_UNDEFINED" : 0;
                }
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    object.timeout = message.timeout;
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    object.codePackage = message.codePackage;
                if (message.legalProse != null && message.hasOwnProperty("legalProse"))
                    object.legalProse = message.legalProse;
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    object.ctype = options.enums === String ? $root.rep.protos.ChaincodeDeploy.CodeType[message.ctype] : message.ctype;
                return object;
            };

            /**
             * Converts this ChaincodeDeploy to JSON.
             * @function toJSON
             * @memberof rep.protos.ChaincodeDeploy
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChaincodeDeploy.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * CodeType enum.
             * @name rep.protos.ChaincodeDeploy.CodeType
             * @enum {string}
             * @property {number} CODE_UNDEFINED=0 CODE_UNDEFINED value
             * @property {number} CODE_JAVASCRIPT=1 CODE_JAVASCRIPT value
             * @property {number} CODE_SCALA=2 CODE_SCALA value
             */
            ChaincodeDeploy.CodeType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CODE_UNDEFINED"] = 0;
                values[valuesById[1] = "CODE_JAVASCRIPT"] = 1;
                values[valuesById[2] = "CODE_SCALA"] = 2;
                return values;
            })();

            return ChaincodeDeploy;
        })();

        protos.Transaction = (function() {

            /**
             * Properties of a Transaction.
             * @memberof rep.protos
             * @interface ITransaction
             * @property {string|null} [id] Transaction id
             * @property {rep.protos.Transaction.Type|null} [type] Transaction type
             * @property {rep.protos.IChaincodeId|null} [cid] Transaction cid
             * @property {rep.protos.IChaincodeDeploy|null} [spec] Transaction spec
             * @property {rep.protos.IChaincodeInput|null} [ipt] Transaction ipt
             * @property {boolean|null} [state] Transaction state
             * @property {rep.protos.ISignature|null} [signature] Transaction signature
             */

            /**
             * Constructs a new Transaction.
             * @memberof rep.protos
             * @classdesc Represents a Transaction.
             * @implements ITransaction
             * @constructor
             * @param {rep.protos.ITransaction=} [properties] Properties to set
             */
            function Transaction(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Transaction id.
             * @member {string} id
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.id = "";

            /**
             * Transaction type.
             * @member {rep.protos.Transaction.Type} type
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.type = 0;

            /**
             * Transaction cid.
             * @member {rep.protos.IChaincodeId|null|undefined} cid
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.cid = null;

            /**
             * Transaction spec.
             * @member {rep.protos.IChaincodeDeploy|null|undefined} spec
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.spec = null;

            /**
             * Transaction ipt.
             * @member {rep.protos.IChaincodeInput|null|undefined} ipt
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.ipt = null;

            /**
             * Transaction state.
             * @member {boolean} state
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.state = false;

            /**
             * Transaction signature.
             * @member {rep.protos.ISignature|null|undefined} signature
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.signature = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * Transaction para.
             * @member {"spec"|"ipt"|"state"|undefined} para
             * @memberof rep.protos.Transaction
             * @instance
             */
            Object.defineProperty(Transaction.prototype, "para", {
                get: $util.oneOfGetter($oneOfFields = ["spec", "ipt", "state"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Transaction instance using the specified properties.
             * @function create
             * @memberof rep.protos.Transaction
             * @static
             * @param {rep.protos.ITransaction=} [properties] Properties to set
             * @returns {rep.protos.Transaction} Transaction instance
             */
            Transaction.create = function create(properties) {
                return new Transaction(properties);
            };

            /**
             * Encodes the specified Transaction message. Does not implicitly {@link rep.protos.Transaction.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Transaction
             * @static
             * @param {rep.protos.ITransaction} message Transaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Transaction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.cid != null && message.hasOwnProperty("cid"))
                    $root.rep.protos.ChaincodeId.encode(message.cid, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.spec != null && message.hasOwnProperty("spec"))
                    $root.rep.protos.ChaincodeDeploy.encode(message.spec, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.ipt != null && message.hasOwnProperty("ipt"))
                    $root.rep.protos.ChaincodeInput.encode(message.ipt, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.state);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    $root.rep.protos.Signature.encode(message.signature, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Transaction message, length delimited. Does not implicitly {@link rep.protos.Transaction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Transaction
             * @static
             * @param {rep.protos.ITransaction} message Transaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Transaction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Transaction message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Transaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Transaction} Transaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transaction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Transaction();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.cid = $root.rep.protos.ChaincodeId.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.spec = $root.rep.protos.ChaincodeDeploy.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.ipt = $root.rep.protos.ChaincodeInput.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.state = reader.bool();
                        break;
                    case 7:
                        message.signature = $root.rep.protos.Signature.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Transaction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Transaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Transaction} Transaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transaction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Transaction message.
             * @function verify
             * @memberof rep.protos.Transaction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Transaction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                let properties = {};
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.cid != null && message.hasOwnProperty("cid")) {
                    let error = $root.rep.protos.ChaincodeId.verify(message.cid);
                    if (error)
                        return "cid." + error;
                }
                if (message.spec != null && message.hasOwnProperty("spec")) {
                    properties.para = 1;
                    {
                        let error = $root.rep.protos.ChaincodeDeploy.verify(message.spec);
                        if (error)
                            return "spec." + error;
                    }
                }
                if (message.ipt != null && message.hasOwnProperty("ipt")) {
                    if (properties.para === 1)
                        return "para: multiple values";
                    properties.para = 1;
                    {
                        let error = $root.rep.protos.ChaincodeInput.verify(message.ipt);
                        if (error)
                            return "ipt." + error;
                    }
                }
                if (message.state != null && message.hasOwnProperty("state")) {
                    if (properties.para === 1)
                        return "para: multiple values";
                    properties.para = 1;
                    if (typeof message.state !== "boolean")
                        return "state: boolean expected";
                }
                if (message.signature != null && message.hasOwnProperty("signature")) {
                    let error = $root.rep.protos.Signature.verify(message.signature);
                    if (error)
                        return "signature." + error;
                }
                return null;
            };

            /**
             * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Transaction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Transaction} Transaction
             */
            Transaction.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Transaction)
                    return object;
                let message = new $root.rep.protos.Transaction();
                if (object.id != null)
                    message.id = String(object.id);
                switch (object.type) {
                case "UNDEFINED":
                case 0:
                    message.type = 0;
                    break;
                case "CHAINCODE_DEPLOY":
                case 1:
                    message.type = 1;
                    break;
                case "CHAINCODE_INVOKE":
                case 2:
                    message.type = 2;
                    break;
                case "CHAINCODE_SET_STATE":
                case 3:
                    message.type = 3;
                    break;
                }
                if (object.cid != null) {
                    if (typeof object.cid !== "object")
                        throw TypeError(".rep.protos.Transaction.cid: object expected");
                    message.cid = $root.rep.protos.ChaincodeId.fromObject(object.cid);
                }
                if (object.spec != null) {
                    if (typeof object.spec !== "object")
                        throw TypeError(".rep.protos.Transaction.spec: object expected");
                    message.spec = $root.rep.protos.ChaincodeDeploy.fromObject(object.spec);
                }
                if (object.ipt != null) {
                    if (typeof object.ipt !== "object")
                        throw TypeError(".rep.protos.Transaction.ipt: object expected");
                    message.ipt = $root.rep.protos.ChaincodeInput.fromObject(object.ipt);
                }
                if (object.state != null)
                    message.state = Boolean(object.state);
                if (object.signature != null) {
                    if (typeof object.signature !== "object")
                        throw TypeError(".rep.protos.Transaction.signature: object expected");
                    message.signature = $root.rep.protos.Signature.fromObject(object.signature);
                }
                return message;
            };

            /**
             * Creates a plain object from a Transaction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Transaction
             * @static
             * @param {rep.protos.Transaction} message Transaction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Transaction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.type = options.enums === String ? "UNDEFINED" : 0;
                    object.cid = null;
                    object.signature = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.rep.protos.Transaction.Type[message.type] : message.type;
                if (message.cid != null && message.hasOwnProperty("cid"))
                    object.cid = $root.rep.protos.ChaincodeId.toObject(message.cid, options);
                if (message.spec != null && message.hasOwnProperty("spec")) {
                    object.spec = $root.rep.protos.ChaincodeDeploy.toObject(message.spec, options);
                    if (options.oneofs)
                        object.para = "spec";
                }
                if (message.ipt != null && message.hasOwnProperty("ipt")) {
                    object.ipt = $root.rep.protos.ChaincodeInput.toObject(message.ipt, options);
                    if (options.oneofs)
                        object.para = "ipt";
                }
                if (message.state != null && message.hasOwnProperty("state")) {
                    object.state = message.state;
                    if (options.oneofs)
                        object.para = "state";
                }
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = $root.rep.protos.Signature.toObject(message.signature, options);
                return object;
            };

            /**
             * Converts this Transaction to JSON.
             * @function toJSON
             * @memberof rep.protos.Transaction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Transaction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Type enum.
             * @name rep.protos.Transaction.Type
             * @enum {string}
             * @property {number} UNDEFINED=0 UNDEFINED value
             * @property {number} CHAINCODE_DEPLOY=1 CHAINCODE_DEPLOY value
             * @property {number} CHAINCODE_INVOKE=2 CHAINCODE_INVOKE value
             * @property {number} CHAINCODE_SET_STATE=3 CHAINCODE_SET_STATE value
             */
            Transaction.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNDEFINED"] = 0;
                values[valuesById[1] = "CHAINCODE_DEPLOY"] = 1;
                values[valuesById[2] = "CHAINCODE_INVOKE"] = 2;
                values[valuesById[3] = "CHAINCODE_SET_STATE"] = 3;
                return values;
            })();

            return Transaction;
        })();

        protos.Block = (function() {

            /**
             * Properties of a Block.
             * @memberof rep.protos
             * @interface IBlock
             * @property {number|null} [version] Block version
             * @property {number|Long|null} [height] Block height
             * @property {Array.<rep.protos.ITransaction>|null} [transactions] Block transactions
             * @property {Array.<rep.protos.ITransactionResult>|null} [transactionResults] Block transactionResults
             * @property {Uint8Array|null} [hashOfBlock] Block hashOfBlock
             * @property {Uint8Array|null} [previousBlockHash] Block previousBlockHash
             * @property {Array.<rep.protos.ISignature>|null} [endorsements] Block endorsements
             * @property {Uint8Array|null} [stateHash] Block stateHash
             */

            /**
             * Constructs a new Block.
             * @memberof rep.protos
             * @classdesc Represents a Block.
             * @implements IBlock
             * @constructor
             * @param {rep.protos.IBlock=} [properties] Properties to set
             */
            function Block(properties) {
                this.transactions = [];
                this.transactionResults = [];
                this.endorsements = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Block version.
             * @member {number} version
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.version = 0;

            /**
             * Block height.
             * @member {number|Long} height
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Block transactions.
             * @member {Array.<rep.protos.ITransaction>} transactions
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.transactions = $util.emptyArray;

            /**
             * Block transactionResults.
             * @member {Array.<rep.protos.ITransactionResult>} transactionResults
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.transactionResults = $util.emptyArray;

            /**
             * Block hashOfBlock.
             * @member {Uint8Array} hashOfBlock
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.hashOfBlock = $util.newBuffer([]);

            /**
             * Block previousBlockHash.
             * @member {Uint8Array} previousBlockHash
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.previousBlockHash = $util.newBuffer([]);

            /**
             * Block endorsements.
             * @member {Array.<rep.protos.ISignature>} endorsements
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.endorsements = $util.emptyArray;

            /**
             * Block stateHash.
             * @member {Uint8Array} stateHash
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.stateHash = $util.newBuffer([]);

            /**
             * Creates a new Block instance using the specified properties.
             * @function create
             * @memberof rep.protos.Block
             * @static
             * @param {rep.protos.IBlock=} [properties] Properties to set
             * @returns {rep.protos.Block} Block instance
             */
            Block.create = function create(properties) {
                return new Block(properties);
            };

            /**
             * Encodes the specified Block message. Does not implicitly {@link rep.protos.Block.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Block
             * @static
             * @param {rep.protos.IBlock} message Block message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Block.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
                if (message.height != null && message.hasOwnProperty("height"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.height);
                if (message.transactions != null && message.transactions.length)
                    for (let i = 0; i < message.transactions.length; ++i)
                        $root.rep.protos.Transaction.encode(message.transactions[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.transactionResults != null && message.transactionResults.length)
                    for (let i = 0; i < message.transactionResults.length; ++i)
                        $root.rep.protos.TransactionResult.encode(message.transactionResults[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.hashOfBlock != null && message.hasOwnProperty("hashOfBlock"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.hashOfBlock);
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.previousBlockHash);
                if (message.endorsements != null && message.endorsements.length)
                    for (let i = 0; i < message.endorsements.length; ++i)
                        $root.rep.protos.Signature.encode(message.endorsements[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.stateHash);
                return writer;
            };

            /**
             * Encodes the specified Block message, length delimited. Does not implicitly {@link rep.protos.Block.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Block
             * @static
             * @param {rep.protos.IBlock} message Block message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Block.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Block message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Block
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Block} Block
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Block.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Block();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.uint32();
                        break;
                    case 2:
                        message.height = reader.uint64();
                        break;
                    case 3:
                        if (!(message.transactions && message.transactions.length))
                            message.transactions = [];
                        message.transactions.push($root.rep.protos.Transaction.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        if (!(message.transactionResults && message.transactionResults.length))
                            message.transactionResults = [];
                        message.transactionResults.push($root.rep.protos.TransactionResult.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        message.hashOfBlock = reader.bytes();
                        break;
                    case 6:
                        message.previousBlockHash = reader.bytes();
                        break;
                    case 7:
                        if (!(message.endorsements && message.endorsements.length))
                            message.endorsements = [];
                        message.endorsements.push($root.rep.protos.Signature.decode(reader, reader.uint32()));
                        break;
                    case 8:
                        message.stateHash = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Block message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Block
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Block} Block
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Block.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Block message.
             * @function verify
             * @memberof rep.protos.Block
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Block.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                        return "height: integer|Long expected";
                if (message.transactions != null && message.hasOwnProperty("transactions")) {
                    if (!Array.isArray(message.transactions))
                        return "transactions: array expected";
                    for (let i = 0; i < message.transactions.length; ++i) {
                        let error = $root.rep.protos.Transaction.verify(message.transactions[i]);
                        if (error)
                            return "transactions." + error;
                    }
                }
                if (message.transactionResults != null && message.hasOwnProperty("transactionResults")) {
                    if (!Array.isArray(message.transactionResults))
                        return "transactionResults: array expected";
                    for (let i = 0; i < message.transactionResults.length; ++i) {
                        let error = $root.rep.protos.TransactionResult.verify(message.transactionResults[i]);
                        if (error)
                            return "transactionResults." + error;
                    }
                }
                if (message.hashOfBlock != null && message.hasOwnProperty("hashOfBlock"))
                    if (!(message.hashOfBlock && typeof message.hashOfBlock.length === "number" || $util.isString(message.hashOfBlock)))
                        return "hashOfBlock: buffer expected";
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    if (!(message.previousBlockHash && typeof message.previousBlockHash.length === "number" || $util.isString(message.previousBlockHash)))
                        return "previousBlockHash: buffer expected";
                if (message.endorsements != null && message.hasOwnProperty("endorsements")) {
                    if (!Array.isArray(message.endorsements))
                        return "endorsements: array expected";
                    for (let i = 0; i < message.endorsements.length; ++i) {
                        let error = $root.rep.protos.Signature.verify(message.endorsements[i]);
                        if (error)
                            return "endorsements." + error;
                    }
                }
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    if (!(message.stateHash && typeof message.stateHash.length === "number" || $util.isString(message.stateHash)))
                        return "stateHash: buffer expected";
                return null;
            };

            /**
             * Creates a Block message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Block
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Block} Block
             */
            Block.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Block)
                    return object;
                let message = new $root.rep.protos.Block();
                if (object.version != null)
                    message.version = object.version >>> 0;
                if (object.height != null)
                    if ($util.Long)
                        (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                    else if (typeof object.height === "string")
                        message.height = parseInt(object.height, 10);
                    else if (typeof object.height === "number")
                        message.height = object.height;
                    else if (typeof object.height === "object")
                        message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
                if (object.transactions) {
                    if (!Array.isArray(object.transactions))
                        throw TypeError(".rep.protos.Block.transactions: array expected");
                    message.transactions = [];
                    for (let i = 0; i < object.transactions.length; ++i) {
                        if (typeof object.transactions[i] !== "object")
                            throw TypeError(".rep.protos.Block.transactions: object expected");
                        message.transactions[i] = $root.rep.protos.Transaction.fromObject(object.transactions[i]);
                    }
                }
                if (object.transactionResults) {
                    if (!Array.isArray(object.transactionResults))
                        throw TypeError(".rep.protos.Block.transactionResults: array expected");
                    message.transactionResults = [];
                    for (let i = 0; i < object.transactionResults.length; ++i) {
                        if (typeof object.transactionResults[i] !== "object")
                            throw TypeError(".rep.protos.Block.transactionResults: object expected");
                        message.transactionResults[i] = $root.rep.protos.TransactionResult.fromObject(object.transactionResults[i]);
                    }
                }
                if (object.hashOfBlock != null)
                    if (typeof object.hashOfBlock === "string")
                        $util.base64.decode(object.hashOfBlock, message.hashOfBlock = $util.newBuffer($util.base64.length(object.hashOfBlock)), 0);
                    else if (object.hashOfBlock.length)
                        message.hashOfBlock = object.hashOfBlock;
                if (object.previousBlockHash != null)
                    if (typeof object.previousBlockHash === "string")
                        $util.base64.decode(object.previousBlockHash, message.previousBlockHash = $util.newBuffer($util.base64.length(object.previousBlockHash)), 0);
                    else if (object.previousBlockHash.length)
                        message.previousBlockHash = object.previousBlockHash;
                if (object.endorsements) {
                    if (!Array.isArray(object.endorsements))
                        throw TypeError(".rep.protos.Block.endorsements: array expected");
                    message.endorsements = [];
                    for (let i = 0; i < object.endorsements.length; ++i) {
                        if (typeof object.endorsements[i] !== "object")
                            throw TypeError(".rep.protos.Block.endorsements: object expected");
                        message.endorsements[i] = $root.rep.protos.Signature.fromObject(object.endorsements[i]);
                    }
                }
                if (object.stateHash != null)
                    if (typeof object.stateHash === "string")
                        $util.base64.decode(object.stateHash, message.stateHash = $util.newBuffer($util.base64.length(object.stateHash)), 0);
                    else if (object.stateHash.length)
                        message.stateHash = object.stateHash;
                return message;
            };

            /**
             * Creates a plain object from a Block message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Block
             * @static
             * @param {rep.protos.Block} message Block
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Block.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.transactions = [];
                    object.transactionResults = [];
                    object.endorsements = [];
                }
                if (options.defaults) {
                    object.version = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.height = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.hashOfBlock = "";
                    else {
                        object.hashOfBlock = [];
                        if (options.bytes !== Array)
                            object.hashOfBlock = $util.newBuffer(object.hashOfBlock);
                    }
                    if (options.bytes === String)
                        object.previousBlockHash = "";
                    else {
                        object.previousBlockHash = [];
                        if (options.bytes !== Array)
                            object.previousBlockHash = $util.newBuffer(object.previousBlockHash);
                    }
                    if (options.bytes === String)
                        object.stateHash = "";
                    else {
                        object.stateHash = [];
                        if (options.bytes !== Array)
                            object.stateHash = $util.newBuffer(object.stateHash);
                    }
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.height != null && message.hasOwnProperty("height"))
                    if (typeof message.height === "number")
                        object.height = options.longs === String ? String(message.height) : message.height;
                    else
                        object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
                if (message.transactions && message.transactions.length) {
                    object.transactions = [];
                    for (let j = 0; j < message.transactions.length; ++j)
                        object.transactions[j] = $root.rep.protos.Transaction.toObject(message.transactions[j], options);
                }
                if (message.transactionResults && message.transactionResults.length) {
                    object.transactionResults = [];
                    for (let j = 0; j < message.transactionResults.length; ++j)
                        object.transactionResults[j] = $root.rep.protos.TransactionResult.toObject(message.transactionResults[j], options);
                }
                if (message.hashOfBlock != null && message.hasOwnProperty("hashOfBlock"))
                    object.hashOfBlock = options.bytes === String ? $util.base64.encode(message.hashOfBlock, 0, message.hashOfBlock.length) : options.bytes === Array ? Array.prototype.slice.call(message.hashOfBlock) : message.hashOfBlock;
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    object.previousBlockHash = options.bytes === String ? $util.base64.encode(message.previousBlockHash, 0, message.previousBlockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.previousBlockHash) : message.previousBlockHash;
                if (message.endorsements && message.endorsements.length) {
                    object.endorsements = [];
                    for (let j = 0; j < message.endorsements.length; ++j)
                        object.endorsements[j] = $root.rep.protos.Signature.toObject(message.endorsements[j], options);
                }
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    object.stateHash = options.bytes === String ? $util.base64.encode(message.stateHash, 0, message.stateHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.stateHash) : message.stateHash;
                return object;
            };

            /**
             * Converts this Block to JSON.
             * @function toJSON
             * @memberof rep.protos.Block
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Block.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Block;
        })();

        protos.OperLog = (function() {

            /**
             * Properties of an OperLog.
             * @memberof rep.protos
             * @interface IOperLog
             * @property {string|null} [key] OperLog key
             * @property {Uint8Array|null} [oldValue] OperLog oldValue
             * @property {Uint8Array|null} [newValue] OperLog newValue
             */

            /**
             * Constructs a new OperLog.
             * @memberof rep.protos
             * @classdesc Represents an OperLog.
             * @implements IOperLog
             * @constructor
             * @param {rep.protos.IOperLog=} [properties] Properties to set
             */
            function OperLog(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OperLog key.
             * @member {string} key
             * @memberof rep.protos.OperLog
             * @instance
             */
            OperLog.prototype.key = "";

            /**
             * OperLog oldValue.
             * @member {Uint8Array} oldValue
             * @memberof rep.protos.OperLog
             * @instance
             */
            OperLog.prototype.oldValue = $util.newBuffer([]);

            /**
             * OperLog newValue.
             * @member {Uint8Array} newValue
             * @memberof rep.protos.OperLog
             * @instance
             */
            OperLog.prototype.newValue = $util.newBuffer([]);

            /**
             * Creates a new OperLog instance using the specified properties.
             * @function create
             * @memberof rep.protos.OperLog
             * @static
             * @param {rep.protos.IOperLog=} [properties] Properties to set
             * @returns {rep.protos.OperLog} OperLog instance
             */
            OperLog.create = function create(properties) {
                return new OperLog(properties);
            };

            /**
             * Encodes the specified OperLog message. Does not implicitly {@link rep.protos.OperLog.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.OperLog
             * @static
             * @param {rep.protos.IOperLog} message OperLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperLog.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.oldValue);
                if (message.newValue != null && message.hasOwnProperty("newValue"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.newValue);
                return writer;
            };

            /**
             * Encodes the specified OperLog message, length delimited. Does not implicitly {@link rep.protos.OperLog.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.OperLog
             * @static
             * @param {rep.protos.IOperLog} message OperLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperLog.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OperLog message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.OperLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.OperLog} OperLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperLog.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.OperLog();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.oldValue = reader.bytes();
                        break;
                    case 3:
                        message.newValue = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an OperLog message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.OperLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.OperLog} OperLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperLog.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OperLog message.
             * @function verify
             * @memberof rep.protos.OperLog
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OperLog.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                    if (!(message.oldValue && typeof message.oldValue.length === "number" || $util.isString(message.oldValue)))
                        return "oldValue: buffer expected";
                if (message.newValue != null && message.hasOwnProperty("newValue"))
                    if (!(message.newValue && typeof message.newValue.length === "number" || $util.isString(message.newValue)))
                        return "newValue: buffer expected";
                return null;
            };

            /**
             * Creates an OperLog message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.OperLog
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.OperLog} OperLog
             */
            OperLog.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.OperLog)
                    return object;
                let message = new $root.rep.protos.OperLog();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.oldValue != null)
                    if (typeof object.oldValue === "string")
                        $util.base64.decode(object.oldValue, message.oldValue = $util.newBuffer($util.base64.length(object.oldValue)), 0);
                    else if (object.oldValue.length)
                        message.oldValue = object.oldValue;
                if (object.newValue != null)
                    if (typeof object.newValue === "string")
                        $util.base64.decode(object.newValue, message.newValue = $util.newBuffer($util.base64.length(object.newValue)), 0);
                    else if (object.newValue.length)
                        message.newValue = object.newValue;
                return message;
            };

            /**
             * Creates a plain object from an OperLog message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.OperLog
             * @static
             * @param {rep.protos.OperLog} message OperLog
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OperLog.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.key = "";
                    if (options.bytes === String)
                        object.oldValue = "";
                    else {
                        object.oldValue = [];
                        if (options.bytes !== Array)
                            object.oldValue = $util.newBuffer(object.oldValue);
                    }
                    if (options.bytes === String)
                        object.newValue = "";
                    else {
                        object.newValue = [];
                        if (options.bytes !== Array)
                            object.newValue = $util.newBuffer(object.newValue);
                    }
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                    object.oldValue = options.bytes === String ? $util.base64.encode(message.oldValue, 0, message.oldValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.oldValue) : message.oldValue;
                if (message.newValue != null && message.hasOwnProperty("newValue"))
                    object.newValue = options.bytes === String ? $util.base64.encode(message.newValue, 0, message.newValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.newValue) : message.newValue;
                return object;
            };

            /**
             * Converts this OperLog to JSON.
             * @function toJSON
             * @memberof rep.protos.OperLog
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OperLog.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OperLog;
        })();

        protos.ActionResult = (function() {

            /**
             * Properties of an ActionResult.
             * @memberof rep.protos
             * @interface IActionResult
             * @property {number|null} [code] ActionResult code
             * @property {string|null} [reason] ActionResult reason
             */

            /**
             * Constructs a new ActionResult.
             * @memberof rep.protos
             * @classdesc Represents an ActionResult.
             * @implements IActionResult
             * @constructor
             * @param {rep.protos.IActionResult=} [properties] Properties to set
             */
            function ActionResult(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionResult code.
             * @member {number} code
             * @memberof rep.protos.ActionResult
             * @instance
             */
            ActionResult.prototype.code = 0;

            /**
             * ActionResult reason.
             * @member {string} reason
             * @memberof rep.protos.ActionResult
             * @instance
             */
            ActionResult.prototype.reason = "";

            /**
             * Creates a new ActionResult instance using the specified properties.
             * @function create
             * @memberof rep.protos.ActionResult
             * @static
             * @param {rep.protos.IActionResult=} [properties] Properties to set
             * @returns {rep.protos.ActionResult} ActionResult instance
             */
            ActionResult.create = function create(properties) {
                return new ActionResult(properties);
            };

            /**
             * Encodes the specified ActionResult message. Does not implicitly {@link rep.protos.ActionResult.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ActionResult
             * @static
             * @param {rep.protos.IActionResult} message ActionResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && message.hasOwnProperty("code"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
                return writer;
            };

            /**
             * Encodes the specified ActionResult message, length delimited. Does not implicitly {@link rep.protos.ActionResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ActionResult
             * @static
             * @param {rep.protos.IActionResult} message ActionResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ActionResult message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ActionResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ActionResult} ActionResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ActionResult();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.code = reader.int32();
                        break;
                    case 2:
                        message.reason = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ActionResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ActionResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ActionResult} ActionResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ActionResult message.
             * @function verify
             * @memberof rep.protos.ActionResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActionResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isInteger(message.code))
                        return "code: integer expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                return null;
            };

            /**
             * Creates an ActionResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ActionResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ActionResult} ActionResult
             */
            ActionResult.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ActionResult)
                    return object;
                let message = new $root.rep.protos.ActionResult();
                if (object.code != null)
                    message.code = object.code | 0;
                if (object.reason != null)
                    message.reason = String(object.reason);
                return message;
            };

            /**
             * Creates a plain object from an ActionResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ActionResult
             * @static
             * @param {rep.protos.ActionResult} message ActionResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.code = 0;
                    object.reason = "";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                return object;
            };

            /**
             * Converts this ActionResult to JSON.
             * @function toJSON
             * @memberof rep.protos.ActionResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionResult;
        })();

        protos.TransactionResult = (function() {

            /**
             * Properties of a TransactionResult.
             * @memberof rep.protos
             * @interface ITransactionResult
             * @property {string|null} [txId] TransactionResult txId
             * @property {Array.<rep.protos.IOperLog>|null} [ol] TransactionResult ol
             * @property {rep.protos.IActionResult|null} [result] TransactionResult result
             */

            /**
             * Constructs a new TransactionResult.
             * @memberof rep.protos
             * @classdesc Represents a TransactionResult.
             * @implements ITransactionResult
             * @constructor
             * @param {rep.protos.ITransactionResult=} [properties] Properties to set
             */
            function TransactionResult(properties) {
                this.ol = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransactionResult txId.
             * @member {string} txId
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.txId = "";

            /**
             * TransactionResult ol.
             * @member {Array.<rep.protos.IOperLog>} ol
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.ol = $util.emptyArray;

            /**
             * TransactionResult result.
             * @member {rep.protos.IActionResult|null|undefined} result
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.result = null;

            /**
             * Creates a new TransactionResult instance using the specified properties.
             * @function create
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {rep.protos.ITransactionResult=} [properties] Properties to set
             * @returns {rep.protos.TransactionResult} TransactionResult instance
             */
            TransactionResult.create = function create(properties) {
                return new TransactionResult(properties);
            };

            /**
             * Encodes the specified TransactionResult message. Does not implicitly {@link rep.protos.TransactionResult.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {rep.protos.ITransactionResult} message TransactionResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.txId != null && message.hasOwnProperty("txId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.txId);
                if (message.ol != null && message.ol.length)
                    for (let i = 0; i < message.ol.length; ++i)
                        $root.rep.protos.OperLog.encode(message.ol[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.result != null && message.hasOwnProperty("result"))
                    $root.rep.protos.ActionResult.encode(message.result, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TransactionResult message, length delimited. Does not implicitly {@link rep.protos.TransactionResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {rep.protos.ITransactionResult} message TransactionResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransactionResult message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.TransactionResult} TransactionResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.TransactionResult();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.txId = reader.string();
                        break;
                    case 2:
                        if (!(message.ol && message.ol.length))
                            message.ol = [];
                        message.ol.push($root.rep.protos.OperLog.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.result = $root.rep.protos.ActionResult.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransactionResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.TransactionResult} TransactionResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransactionResult message.
             * @function verify
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransactionResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.txId != null && message.hasOwnProperty("txId"))
                    if (!$util.isString(message.txId))
                        return "txId: string expected";
                if (message.ol != null && message.hasOwnProperty("ol")) {
                    if (!Array.isArray(message.ol))
                        return "ol: array expected";
                    for (let i = 0; i < message.ol.length; ++i) {
                        let error = $root.rep.protos.OperLog.verify(message.ol[i]);
                        if (error)
                            return "ol." + error;
                    }
                }
                if (message.result != null && message.hasOwnProperty("result")) {
                    let error = $root.rep.protos.ActionResult.verify(message.result);
                    if (error)
                        return "result." + error;
                }
                return null;
            };

            /**
             * Creates a TransactionResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.TransactionResult} TransactionResult
             */
            TransactionResult.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.TransactionResult)
                    return object;
                let message = new $root.rep.protos.TransactionResult();
                if (object.txId != null)
                    message.txId = String(object.txId);
                if (object.ol) {
                    if (!Array.isArray(object.ol))
                        throw TypeError(".rep.protos.TransactionResult.ol: array expected");
                    message.ol = [];
                    for (let i = 0; i < object.ol.length; ++i) {
                        if (typeof object.ol[i] !== "object")
                            throw TypeError(".rep.protos.TransactionResult.ol: object expected");
                        message.ol[i] = $root.rep.protos.OperLog.fromObject(object.ol[i]);
                    }
                }
                if (object.result != null) {
                    if (typeof object.result !== "object")
                        throw TypeError(".rep.protos.TransactionResult.result: object expected");
                    message.result = $root.rep.protos.ActionResult.fromObject(object.result);
                }
                return message;
            };

            /**
             * Creates a plain object from a TransactionResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.TransactionResult
             * @static
             * @param {rep.protos.TransactionResult} message TransactionResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransactionResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.ol = [];
                if (options.defaults) {
                    object.txId = "";
                    object.result = null;
                }
                if (message.txId != null && message.hasOwnProperty("txId"))
                    object.txId = message.txId;
                if (message.ol && message.ol.length) {
                    object.ol = [];
                    for (let j = 0; j < message.ol.length; ++j)
                        object.ol[j] = $root.rep.protos.OperLog.toObject(message.ol[j], options);
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = $root.rep.protos.ActionResult.toObject(message.result, options);
                return object;
            };

            /**
             * Converts this TransactionResult to JSON.
             * @function toJSON
             * @memberof rep.protos.TransactionResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransactionResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransactionResult;
        })();

        protos.BlockchainInfo = (function() {

            /**
             * Properties of a BlockchainInfo.
             * @memberof rep.protos
             * @interface IBlockchainInfo
             * @property {number|Long|null} [height] BlockchainInfo height
             * @property {number|Long|null} [totalTransactions] BlockchainInfo totalTransactions
             * @property {Uint8Array|null} [currentBlockHash] BlockchainInfo currentBlockHash
             * @property {Uint8Array|null} [previousBlockHash] BlockchainInfo previousBlockHash
             * @property {Uint8Array|null} [currentStateHash] BlockchainInfo currentStateHash
             */

            /**
             * Constructs a new BlockchainInfo.
             * @memberof rep.protos
             * @classdesc Represents a BlockchainInfo.
             * @implements IBlockchainInfo
             * @constructor
             * @param {rep.protos.IBlockchainInfo=} [properties] Properties to set
             */
            function BlockchainInfo(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BlockchainInfo height.
             * @member {number|Long} height
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * BlockchainInfo totalTransactions.
             * @member {number|Long} totalTransactions
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.totalTransactions = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * BlockchainInfo currentBlockHash.
             * @member {Uint8Array} currentBlockHash
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.currentBlockHash = $util.newBuffer([]);

            /**
             * BlockchainInfo previousBlockHash.
             * @member {Uint8Array} previousBlockHash
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.previousBlockHash = $util.newBuffer([]);

            /**
             * BlockchainInfo currentStateHash.
             * @member {Uint8Array} currentStateHash
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.currentStateHash = $util.newBuffer([]);

            /**
             * Creates a new BlockchainInfo instance using the specified properties.
             * @function create
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {rep.protos.IBlockchainInfo=} [properties] Properties to set
             * @returns {rep.protos.BlockchainInfo} BlockchainInfo instance
             */
            BlockchainInfo.create = function create(properties) {
                return new BlockchainInfo(properties);
            };

            /**
             * Encodes the specified BlockchainInfo message. Does not implicitly {@link rep.protos.BlockchainInfo.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {rep.protos.IBlockchainInfo} message BlockchainInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BlockchainInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.height != null && message.hasOwnProperty("height"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.height);
                if (message.totalTransactions != null && message.hasOwnProperty("totalTransactions"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.totalTransactions);
                if (message.currentBlockHash != null && message.hasOwnProperty("currentBlockHash"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.currentBlockHash);
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.previousBlockHash);
                if (message.currentStateHash != null && message.hasOwnProperty("currentStateHash"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.currentStateHash);
                return writer;
            };

            /**
             * Encodes the specified BlockchainInfo message, length delimited. Does not implicitly {@link rep.protos.BlockchainInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {rep.protos.IBlockchainInfo} message BlockchainInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BlockchainInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BlockchainInfo message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.BlockchainInfo} BlockchainInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BlockchainInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.BlockchainInfo();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.height = reader.uint64();
                        break;
                    case 2:
                        message.totalTransactions = reader.uint64();
                        break;
                    case 3:
                        message.currentBlockHash = reader.bytes();
                        break;
                    case 4:
                        message.previousBlockHash = reader.bytes();
                        break;
                    case 5:
                        message.currentStateHash = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BlockchainInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.BlockchainInfo} BlockchainInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BlockchainInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BlockchainInfo message.
             * @function verify
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BlockchainInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                        return "height: integer|Long expected";
                if (message.totalTransactions != null && message.hasOwnProperty("totalTransactions"))
                    if (!$util.isInteger(message.totalTransactions) && !(message.totalTransactions && $util.isInteger(message.totalTransactions.low) && $util.isInteger(message.totalTransactions.high)))
                        return "totalTransactions: integer|Long expected";
                if (message.currentBlockHash != null && message.hasOwnProperty("currentBlockHash"))
                    if (!(message.currentBlockHash && typeof message.currentBlockHash.length === "number" || $util.isString(message.currentBlockHash)))
                        return "currentBlockHash: buffer expected";
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    if (!(message.previousBlockHash && typeof message.previousBlockHash.length === "number" || $util.isString(message.previousBlockHash)))
                        return "previousBlockHash: buffer expected";
                if (message.currentStateHash != null && message.hasOwnProperty("currentStateHash"))
                    if (!(message.currentStateHash && typeof message.currentStateHash.length === "number" || $util.isString(message.currentStateHash)))
                        return "currentStateHash: buffer expected";
                return null;
            };

            /**
             * Creates a BlockchainInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.BlockchainInfo} BlockchainInfo
             */
            BlockchainInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.BlockchainInfo)
                    return object;
                let message = new $root.rep.protos.BlockchainInfo();
                if (object.height != null)
                    if ($util.Long)
                        (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                    else if (typeof object.height === "string")
                        message.height = parseInt(object.height, 10);
                    else if (typeof object.height === "number")
                        message.height = object.height;
                    else if (typeof object.height === "object")
                        message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
                if (object.totalTransactions != null)
                    if ($util.Long)
                        (message.totalTransactions = $util.Long.fromValue(object.totalTransactions)).unsigned = true;
                    else if (typeof object.totalTransactions === "string")
                        message.totalTransactions = parseInt(object.totalTransactions, 10);
                    else if (typeof object.totalTransactions === "number")
                        message.totalTransactions = object.totalTransactions;
                    else if (typeof object.totalTransactions === "object")
                        message.totalTransactions = new $util.LongBits(object.totalTransactions.low >>> 0, object.totalTransactions.high >>> 0).toNumber(true);
                if (object.currentBlockHash != null)
                    if (typeof object.currentBlockHash === "string")
                        $util.base64.decode(object.currentBlockHash, message.currentBlockHash = $util.newBuffer($util.base64.length(object.currentBlockHash)), 0);
                    else if (object.currentBlockHash.length)
                        message.currentBlockHash = object.currentBlockHash;
                if (object.previousBlockHash != null)
                    if (typeof object.previousBlockHash === "string")
                        $util.base64.decode(object.previousBlockHash, message.previousBlockHash = $util.newBuffer($util.base64.length(object.previousBlockHash)), 0);
                    else if (object.previousBlockHash.length)
                        message.previousBlockHash = object.previousBlockHash;
                if (object.currentStateHash != null)
                    if (typeof object.currentStateHash === "string")
                        $util.base64.decode(object.currentStateHash, message.currentStateHash = $util.newBuffer($util.base64.length(object.currentStateHash)), 0);
                    else if (object.currentStateHash.length)
                        message.currentStateHash = object.currentStateHash;
                return message;
            };

            /**
             * Creates a plain object from a BlockchainInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.BlockchainInfo
             * @static
             * @param {rep.protos.BlockchainInfo} message BlockchainInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BlockchainInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.height = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.totalTransactions = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.totalTransactions = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.currentBlockHash = "";
                    else {
                        object.currentBlockHash = [];
                        if (options.bytes !== Array)
                            object.currentBlockHash = $util.newBuffer(object.currentBlockHash);
                    }
                    if (options.bytes === String)
                        object.previousBlockHash = "";
                    else {
                        object.previousBlockHash = [];
                        if (options.bytes !== Array)
                            object.previousBlockHash = $util.newBuffer(object.previousBlockHash);
                    }
                    if (options.bytes === String)
                        object.currentStateHash = "";
                    else {
                        object.currentStateHash = [];
                        if (options.bytes !== Array)
                            object.currentStateHash = $util.newBuffer(object.currentStateHash);
                    }
                }
                if (message.height != null && message.hasOwnProperty("height"))
                    if (typeof message.height === "number")
                        object.height = options.longs === String ? String(message.height) : message.height;
                    else
                        object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
                if (message.totalTransactions != null && message.hasOwnProperty("totalTransactions"))
                    if (typeof message.totalTransactions === "number")
                        object.totalTransactions = options.longs === String ? String(message.totalTransactions) : message.totalTransactions;
                    else
                        object.totalTransactions = options.longs === String ? $util.Long.prototype.toString.call(message.totalTransactions) : options.longs === Number ? new $util.LongBits(message.totalTransactions.low >>> 0, message.totalTransactions.high >>> 0).toNumber(true) : message.totalTransactions;
                if (message.currentBlockHash != null && message.hasOwnProperty("currentBlockHash"))
                    object.currentBlockHash = options.bytes === String ? $util.base64.encode(message.currentBlockHash, 0, message.currentBlockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.currentBlockHash) : message.currentBlockHash;
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    object.previousBlockHash = options.bytes === String ? $util.base64.encode(message.previousBlockHash, 0, message.previousBlockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.previousBlockHash) : message.previousBlockHash;
                if (message.currentStateHash != null && message.hasOwnProperty("currentStateHash"))
                    object.currentStateHash = options.bytes === String ? $util.base64.encode(message.currentStateHash, 0, message.currentStateHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.currentStateHash) : message.currentStateHash;
                return object;
            };

            /**
             * Converts this BlockchainInfo to JSON.
             * @function toJSON
             * @memberof rep.protos.BlockchainInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BlockchainInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BlockchainInfo;
        })();

        return protos;
    })();

    return rep;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
