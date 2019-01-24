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

        protos.Book = (function() {

            /**
             * Properties of a Book.
             * @memberof rep.protos
             * @interface IBook
             * @property {string|null} [name] Book name
             */

            /**
             * Constructs a new Book.
             * @memberof rep.protos
             * @classdesc Represents a Book.
             * @implements IBook
             * @constructor
             * @param {rep.protos.IBook=} [properties] Properties to set
             */
            function Book(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Book name.
             * @member {string} name
             * @memberof rep.protos.Book
             * @instance
             */
            Book.prototype.name = "";

            /**
             * Creates a new Book instance using the specified properties.
             * @function create
             * @memberof rep.protos.Book
             * @static
             * @param {rep.protos.IBook=} [properties] Properties to set
             * @returns {rep.protos.Book} Book instance
             */
            Book.create = function create(properties) {
                return new Book(properties);
            };

            /**
             * Encodes the specified Book message. Does not implicitly {@link rep.protos.Book.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Book
             * @static
             * @param {rep.protos.IBook} message Book message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Book.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Book message, length delimited. Does not implicitly {@link rep.protos.Book.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Book
             * @static
             * @param {rep.protos.IBook} message Book message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Book.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Book message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Book
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Book} Book
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Book.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Book();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Book message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Book
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Book} Book
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Book.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Book message.
             * @function verify
             * @memberof rep.protos.Book
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Book.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a Book message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Book
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Book} Book
             */
            Book.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Book)
                    return object;
                let message = new $root.rep.protos.Book();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a Book message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Book
             * @static
             * @param {rep.protos.Book} message Book
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Book.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Book to JSON.
             * @function toJSON
             * @memberof rep.protos.Book
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Book.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Book;
        })();

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

        protos.Endorsement = (function() {

            /**
             * Properties of an Endorsement.
             * @memberof rep.protos
             * @interface IEndorsement
             * @property {Uint8Array|null} [endorser] Endorsement endorser
             * @property {Uint8Array|null} [signature] Endorsement signature
             */

            /**
             * Constructs a new Endorsement.
             * @memberof rep.protos
             * @classdesc Represents an Endorsement.
             * @implements IEndorsement
             * @constructor
             * @param {rep.protos.IEndorsement=} [properties] Properties to set
             */
            function Endorsement(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Endorsement endorser.
             * @member {Uint8Array} endorser
             * @memberof rep.protos.Endorsement
             * @instance
             */
            Endorsement.prototype.endorser = $util.newBuffer([]);

            /**
             * Endorsement signature.
             * @member {Uint8Array} signature
             * @memberof rep.protos.Endorsement
             * @instance
             */
            Endorsement.prototype.signature = $util.newBuffer([]);

            /**
             * Creates a new Endorsement instance using the specified properties.
             * @function create
             * @memberof rep.protos.Endorsement
             * @static
             * @param {rep.protos.IEndorsement=} [properties] Properties to set
             * @returns {rep.protos.Endorsement} Endorsement instance
             */
            Endorsement.create = function create(properties) {
                return new Endorsement(properties);
            };

            /**
             * Encodes the specified Endorsement message. Does not implicitly {@link rep.protos.Endorsement.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.Endorsement
             * @static
             * @param {rep.protos.IEndorsement} message Endorsement message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Endorsement.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.endorser != null && message.hasOwnProperty("endorser"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.endorser);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signature);
                return writer;
            };

            /**
             * Encodes the specified Endorsement message, length delimited. Does not implicitly {@link rep.protos.Endorsement.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.Endorsement
             * @static
             * @param {rep.protos.IEndorsement} message Endorsement message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Endorsement.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Endorsement message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.Endorsement
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.Endorsement} Endorsement
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Endorsement.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.Endorsement();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.endorser = reader.bytes();
                        break;
                    case 2:
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
             * Decodes an Endorsement message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.Endorsement
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.Endorsement} Endorsement
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Endorsement.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Endorsement message.
             * @function verify
             * @memberof rep.protos.Endorsement
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Endorsement.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.endorser != null && message.hasOwnProperty("endorser"))
                    if (!(message.endorser && typeof message.endorser.length === "number" || $util.isString(message.endorser)))
                        return "endorser: buffer expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
                return null;
            };

            /**
             * Creates an Endorsement message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.Endorsement
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.Endorsement} Endorsement
             */
            Endorsement.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.Endorsement)
                    return object;
                let message = new $root.rep.protos.Endorsement();
                if (object.endorser != null)
                    if (typeof object.endorser === "string")
                        $util.base64.decode(object.endorser, message.endorser = $util.newBuffer($util.base64.length(object.endorser)), 0);
                    else if (object.endorser.length)
                        message.endorser = object.endorser;
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length)
                        message.signature = object.signature;
                return message;
            };

            /**
             * Creates a plain object from an Endorsement message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.Endorsement
             * @static
             * @param {rep.protos.Endorsement} message Endorsement
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Endorsement.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.endorser = "";
                    else {
                        object.endorser = [];
                        if (options.bytes !== Array)
                            object.endorser = $util.newBuffer(object.endorser);
                    }
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                }
                if (message.endorser != null && message.hasOwnProperty("endorser"))
                    object.endorser = options.bytes === String ? $util.base64.encode(message.endorser, 0, message.endorser.length) : options.bytes === Array ? Array.prototype.slice.call(message.endorser) : message.endorser;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                return object;
            };

            /**
             * Converts this Endorsement to JSON.
             * @function toJSON
             * @memberof rep.protos.Endorsement
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Endorsement.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Endorsement;
        })();

        protos.ChaincodeID = (function() {

            /**
             * Properties of a ChaincodeID.
             * @memberof rep.protos
             * @interface IChaincodeID
             * @property {string|null} [path] ChaincodeID path
             * @property {string|null} [name] ChaincodeID name
             */

            /**
             * Constructs a new ChaincodeID.
             * @memberof rep.protos
             * @classdesc Represents a ChaincodeID.
             * @implements IChaincodeID
             * @constructor
             * @param {rep.protos.IChaincodeID=} [properties] Properties to set
             */
            function ChaincodeID(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChaincodeID path.
             * @member {string} path
             * @memberof rep.protos.ChaincodeID
             * @instance
             */
            ChaincodeID.prototype.path = "";

            /**
             * ChaincodeID name.
             * @member {string} name
             * @memberof rep.protos.ChaincodeID
             * @instance
             */
            ChaincodeID.prototype.name = "";

            /**
             * Creates a new ChaincodeID instance using the specified properties.
             * @function create
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {rep.protos.IChaincodeID=} [properties] Properties to set
             * @returns {rep.protos.ChaincodeID} ChaincodeID instance
             */
            ChaincodeID.create = function create(properties) {
                return new ChaincodeID(properties);
            };

            /**
             * Encodes the specified ChaincodeID message. Does not implicitly {@link rep.protos.ChaincodeID.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {rep.protos.IChaincodeID} message ChaincodeID message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeID.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.path != null && message.hasOwnProperty("path"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified ChaincodeID message, length delimited. Does not implicitly {@link rep.protos.ChaincodeID.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {rep.protos.IChaincodeID} message ChaincodeID message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeID.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChaincodeID message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ChaincodeID} ChaincodeID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeID.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ChaincodeID();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.path = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChaincodeID message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ChaincodeID} ChaincodeID
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeID.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChaincodeID message.
             * @function verify
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChaincodeID.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.path != null && message.hasOwnProperty("path"))
                    if (!$util.isString(message.path))
                        return "path: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a ChaincodeID message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ChaincodeID} ChaincodeID
             */
            ChaincodeID.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ChaincodeID)
                    return object;
                let message = new $root.rep.protos.ChaincodeID();
                if (object.path != null)
                    message.path = String(object.path);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a ChaincodeID message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ChaincodeID
             * @static
             * @param {rep.protos.ChaincodeID} message ChaincodeID
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChaincodeID.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.path = "";
                    object.name = "";
                }
                if (message.path != null && message.hasOwnProperty("path"))
                    object.path = message.path;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this ChaincodeID to JSON.
             * @function toJSON
             * @memberof rep.protos.ChaincodeID
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChaincodeID.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChaincodeID;
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

        protos.ChaincodeSpec = (function() {

            /**
             * Properties of a ChaincodeSpec.
             * @memberof rep.protos
             * @interface IChaincodeSpec
             * @property {rep.protos.IChaincodeID|null} [chaincodeID] ChaincodeSpec chaincodeID
             * @property {rep.protos.IChaincodeInput|null} [ctorMsg] ChaincodeSpec ctorMsg
             * @property {number|null} [timeout] ChaincodeSpec timeout
             * @property {string|null} [secureContext] ChaincodeSpec secureContext
             * @property {Uint8Array|null} [codePackage] ChaincodeSpec codePackage
             * @property {rep.protos.ChaincodeSpec.CodeType|null} [ctype] ChaincodeSpec ctype
             */

            /**
             * Constructs a new ChaincodeSpec.
             * @memberof rep.protos
             * @classdesc Represents a ChaincodeSpec.
             * @implements IChaincodeSpec
             * @constructor
             * @param {rep.protos.IChaincodeSpec=} [properties] Properties to set
             */
            function ChaincodeSpec(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChaincodeSpec chaincodeID.
             * @member {rep.protos.IChaincodeID|null|undefined} chaincodeID
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.chaincodeID = null;

            /**
             * ChaincodeSpec ctorMsg.
             * @member {rep.protos.IChaincodeInput|null|undefined} ctorMsg
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.ctorMsg = null;

            /**
             * ChaincodeSpec timeout.
             * @member {number} timeout
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.timeout = 0;

            /**
             * ChaincodeSpec secureContext.
             * @member {string} secureContext
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.secureContext = "";

            /**
             * ChaincodeSpec codePackage.
             * @member {Uint8Array} codePackage
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.codePackage = $util.newBuffer([]);

            /**
             * ChaincodeSpec ctype.
             * @member {rep.protos.ChaincodeSpec.CodeType} ctype
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             */
            ChaincodeSpec.prototype.ctype = 0;

            /**
             * Creates a new ChaincodeSpec instance using the specified properties.
             * @function create
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {rep.protos.IChaincodeSpec=} [properties] Properties to set
             * @returns {rep.protos.ChaincodeSpec} ChaincodeSpec instance
             */
            ChaincodeSpec.create = function create(properties) {
                return new ChaincodeSpec(properties);
            };

            /**
             * Encodes the specified ChaincodeSpec message. Does not implicitly {@link rep.protos.ChaincodeSpec.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {rep.protos.IChaincodeSpec} message ChaincodeSpec message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeSpec.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID"))
                    $root.rep.protos.ChaincodeID.encode(message.chaincodeID, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.ctorMsg != null && message.hasOwnProperty("ctorMsg"))
                    $root.rep.protos.ChaincodeInput.encode(message.ctorMsg, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.timeout);
                if (message.secureContext != null && message.hasOwnProperty("secureContext"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.secureContext);
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.codePackage);
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ctype);
                return writer;
            };

            /**
             * Encodes the specified ChaincodeSpec message, length delimited. Does not implicitly {@link rep.protos.ChaincodeSpec.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {rep.protos.IChaincodeSpec} message ChaincodeSpec message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChaincodeSpec.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChaincodeSpec message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.ChaincodeSpec} ChaincodeSpec
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeSpec.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.ChaincodeSpec();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.chaincodeID = $root.rep.protos.ChaincodeID.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.ctorMsg = $root.rep.protos.ChaincodeInput.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.timeout = reader.int32();
                        break;
                    case 4:
                        message.secureContext = reader.string();
                        break;
                    case 5:
                        message.codePackage = reader.bytes();
                        break;
                    case 6:
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
             * Decodes a ChaincodeSpec message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.ChaincodeSpec} ChaincodeSpec
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChaincodeSpec.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChaincodeSpec message.
             * @function verify
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChaincodeSpec.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID")) {
                    let error = $root.rep.protos.ChaincodeID.verify(message.chaincodeID);
                    if (error)
                        return "chaincodeID." + error;
                }
                if (message.ctorMsg != null && message.hasOwnProperty("ctorMsg")) {
                    let error = $root.rep.protos.ChaincodeInput.verify(message.ctorMsg);
                    if (error)
                        return "ctorMsg." + error;
                }
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    if (!$util.isInteger(message.timeout))
                        return "timeout: integer expected";
                if (message.secureContext != null && message.hasOwnProperty("secureContext"))
                    if (!$util.isString(message.secureContext))
                        return "secureContext: string expected";
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    if (!(message.codePackage && typeof message.codePackage.length === "number" || $util.isString(message.codePackage)))
                        return "codePackage: buffer expected";
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
             * Creates a ChaincodeSpec message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.ChaincodeSpec} ChaincodeSpec
             */
            ChaincodeSpec.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.ChaincodeSpec)
                    return object;
                let message = new $root.rep.protos.ChaincodeSpec();
                if (object.chaincodeID != null) {
                    if (typeof object.chaincodeID !== "object")
                        throw TypeError(".rep.protos.ChaincodeSpec.chaincodeID: object expected");
                    message.chaincodeID = $root.rep.protos.ChaincodeID.fromObject(object.chaincodeID);
                }
                if (object.ctorMsg != null) {
                    if (typeof object.ctorMsg !== "object")
                        throw TypeError(".rep.protos.ChaincodeSpec.ctorMsg: object expected");
                    message.ctorMsg = $root.rep.protos.ChaincodeInput.fromObject(object.ctorMsg);
                }
                if (object.timeout != null)
                    message.timeout = object.timeout | 0;
                if (object.secureContext != null)
                    message.secureContext = String(object.secureContext);
                if (object.codePackage != null)
                    if (typeof object.codePackage === "string")
                        $util.base64.decode(object.codePackage, message.codePackage = $util.newBuffer($util.base64.length(object.codePackage)), 0);
                    else if (object.codePackage.length)
                        message.codePackage = object.codePackage;
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
             * Creates a plain object from a ChaincodeSpec message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.ChaincodeSpec
             * @static
             * @param {rep.protos.ChaincodeSpec} message ChaincodeSpec
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChaincodeSpec.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.chaincodeID = null;
                    object.ctorMsg = null;
                    object.timeout = 0;
                    object.secureContext = "";
                    if (options.bytes === String)
                        object.codePackage = "";
                    else {
                        object.codePackage = [];
                        if (options.bytes !== Array)
                            object.codePackage = $util.newBuffer(object.codePackage);
                    }
                    object.ctype = options.enums === String ? "CODE_UNDEFINED" : 0;
                }
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID"))
                    object.chaincodeID = $root.rep.protos.ChaincodeID.toObject(message.chaincodeID, options);
                if (message.ctorMsg != null && message.hasOwnProperty("ctorMsg"))
                    object.ctorMsg = $root.rep.protos.ChaincodeInput.toObject(message.ctorMsg, options);
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    object.timeout = message.timeout;
                if (message.secureContext != null && message.hasOwnProperty("secureContext"))
                    object.secureContext = message.secureContext;
                if (message.codePackage != null && message.hasOwnProperty("codePackage"))
                    object.codePackage = options.bytes === String ? $util.base64.encode(message.codePackage, 0, message.codePackage.length) : options.bytes === Array ? Array.prototype.slice.call(message.codePackage) : message.codePackage;
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    object.ctype = options.enums === String ? $root.rep.protos.ChaincodeSpec.CodeType[message.ctype] : message.ctype;
                return object;
            };

            /**
             * Converts this ChaincodeSpec to JSON.
             * @function toJSON
             * @memberof rep.protos.ChaincodeSpec
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChaincodeSpec.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * CodeType enum.
             * @name rep.protos.ChaincodeSpec.CodeType
             * @enum {string}
             * @property {number} CODE_UNDEFINED=0 CODE_UNDEFINED value
             * @property {number} CODE_JAVASCRIPT=1 CODE_JAVASCRIPT value
             * @property {number} CODE_SCALA=2 CODE_SCALA value
             */
            ChaincodeSpec.CodeType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "CODE_UNDEFINED"] = 0;
                values[valuesById[1] = "CODE_JAVASCRIPT"] = 1;
                values[valuesById[2] = "CODE_SCALA"] = 2;
                return values;
            })();

            return ChaincodeSpec;
        })();

        /**
         * ConfidentialityLevel enum.
         * @name rep.protos.ConfidentialityLevel
         * @enum {string}
         * @property {number} LEVEL_UNDEFINED=0 LEVEL_UNDEFINED value
         * @property {number} PUBLIC=1 PUBLIC value
         * @property {number} CONFIDENTIAL=2 CONFIDENTIAL value
         */
        protos.ConfidentialityLevel = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LEVEL_UNDEFINED"] = 0;
            values[valuesById[1] = "PUBLIC"] = 1;
            values[valuesById[2] = "CONFIDENTIAL"] = 2;
            return values;
        })();

        protos.Transaction = (function() {

            /**
             * Properties of a Transaction.
             * @memberof rep.protos
             * @interface ITransaction
             * @property {rep.protos.Transaction.Type|null} [type] Transaction type
             * @property {Uint8Array|null} [chaincodeID] Transaction chaincodeID
             * @property {rep.protos.IChaincodeSpec|null} [payload] Transaction payload
             * @property {Uint8Array|null} [metadata] Transaction metadata
             * @property {string|null} [txid] Transaction txid
             * @property {google.protobuf.ITimestamp|null} [timestamp] Transaction timestamp
             * @property {rep.protos.ConfidentialityLevel|null} [confidentialityLevel] Transaction confidentialityLevel
             * @property {string|null} [confidentialityProtocolVersion] Transaction confidentialityProtocolVersion
             * @property {Uint8Array|null} [nonce] Transaction nonce
             * @property {Uint8Array|null} [toValidators] Transaction toValidators
             * @property {Uint8Array|null} [cert] Transaction cert
             * @property {Uint8Array|null} [signature] Transaction signature
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
             * Transaction type.
             * @member {rep.protos.Transaction.Type} type
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.type = 0;

            /**
             * Transaction chaincodeID.
             * @member {Uint8Array} chaincodeID
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.chaincodeID = $util.newBuffer([]);

            /**
             * Transaction payload.
             * @member {rep.protos.IChaincodeSpec|null|undefined} payload
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.payload = null;

            /**
             * Transaction metadata.
             * @member {Uint8Array} metadata
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.metadata = $util.newBuffer([]);

            /**
             * Transaction txid.
             * @member {string} txid
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.txid = "";

            /**
             * Transaction timestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} timestamp
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.timestamp = null;

            /**
             * Transaction confidentialityLevel.
             * @member {rep.protos.ConfidentialityLevel} confidentialityLevel
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.confidentialityLevel = 0;

            /**
             * Transaction confidentialityProtocolVersion.
             * @member {string} confidentialityProtocolVersion
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.confidentialityProtocolVersion = "";

            /**
             * Transaction nonce.
             * @member {Uint8Array} nonce
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.nonce = $util.newBuffer([]);

            /**
             * Transaction toValidators.
             * @member {Uint8Array} toValidators
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.toValidators = $util.newBuffer([]);

            /**
             * Transaction cert.
             * @member {Uint8Array} cert
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.cert = $util.newBuffer([]);

            /**
             * Transaction signature.
             * @member {Uint8Array} signature
             * @memberof rep.protos.Transaction
             * @instance
             */
            Transaction.prototype.signature = $util.newBuffer([]);

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
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.chaincodeID);
                if (message.payload != null && message.hasOwnProperty("payload"))
                    $root.rep.protos.ChaincodeSpec.encode(message.payload, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.metadata);
                if (message.txid != null && message.hasOwnProperty("txid"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.txid);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.confidentialityLevel != null && message.hasOwnProperty("confidentialityLevel"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.confidentialityLevel);
                if (message.confidentialityProtocolVersion != null && message.hasOwnProperty("confidentialityProtocolVersion"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.confidentialityProtocolVersion);
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.nonce);
                if (message.toValidators != null && message.hasOwnProperty("toValidators"))
                    writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.toValidators);
                if (message.cert != null && message.hasOwnProperty("cert"))
                    writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.cert);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 12, wireType 2 =*/98).bytes(message.signature);
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
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.chaincodeID = reader.bytes();
                        break;
                    case 3:
                        message.payload = $root.rep.protos.ChaincodeSpec.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.metadata = reader.bytes();
                        break;
                    case 5:
                        message.txid = reader.string();
                        break;
                    case 6:
                        message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.confidentialityLevel = reader.int32();
                        break;
                    case 8:
                        message.confidentialityProtocolVersion = reader.string();
                        break;
                    case 9:
                        message.nonce = reader.bytes();
                        break;
                    case 10:
                        message.toValidators = reader.bytes();
                        break;
                    case 11:
                        message.cert = reader.bytes();
                        break;
                    case 12:
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
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID"))
                    if (!(message.chaincodeID && typeof message.chaincodeID.length === "number" || $util.isString(message.chaincodeID)))
                        return "chaincodeID: buffer expected";
                if (message.payload != null && message.hasOwnProperty("payload")) {
                    let error = $root.rep.protos.ChaincodeSpec.verify(message.payload);
                    if (error)
                        return "payload." + error;
                }
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    if (!(message.metadata && typeof message.metadata.length === "number" || $util.isString(message.metadata)))
                        return "metadata: buffer expected";
                if (message.txid != null && message.hasOwnProperty("txid"))
                    if (!$util.isString(message.txid))
                        return "txid: string expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                    if (error)
                        return "timestamp." + error;
                }
                if (message.confidentialityLevel != null && message.hasOwnProperty("confidentialityLevel"))
                    switch (message.confidentialityLevel) {
                    default:
                        return "confidentialityLevel: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.confidentialityProtocolVersion != null && message.hasOwnProperty("confidentialityProtocolVersion"))
                    if (!$util.isString(message.confidentialityProtocolVersion))
                        return "confidentialityProtocolVersion: string expected";
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    if (!(message.nonce && typeof message.nonce.length === "number" || $util.isString(message.nonce)))
                        return "nonce: buffer expected";
                if (message.toValidators != null && message.hasOwnProperty("toValidators"))
                    if (!(message.toValidators && typeof message.toValidators.length === "number" || $util.isString(message.toValidators)))
                        return "toValidators: buffer expected";
                if (message.cert != null && message.hasOwnProperty("cert"))
                    if (!(message.cert && typeof message.cert.length === "number" || $util.isString(message.cert)))
                        return "cert: buffer expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
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
                case "CHAINCODE_QUERY":
                case 3:
                    message.type = 3;
                    break;
                case "CHAINCODE_TERMINATE":
                case 4:
                    message.type = 4;
                    break;
                }
                if (object.chaincodeID != null)
                    if (typeof object.chaincodeID === "string")
                        $util.base64.decode(object.chaincodeID, message.chaincodeID = $util.newBuffer($util.base64.length(object.chaincodeID)), 0);
                    else if (object.chaincodeID.length)
                        message.chaincodeID = object.chaincodeID;
                if (object.payload != null) {
                    if (typeof object.payload !== "object")
                        throw TypeError(".rep.protos.Transaction.payload: object expected");
                    message.payload = $root.rep.protos.ChaincodeSpec.fromObject(object.payload);
                }
                if (object.metadata != null)
                    if (typeof object.metadata === "string")
                        $util.base64.decode(object.metadata, message.metadata = $util.newBuffer($util.base64.length(object.metadata)), 0);
                    else if (object.metadata.length)
                        message.metadata = object.metadata;
                if (object.txid != null)
                    message.txid = String(object.txid);
                if (object.timestamp != null) {
                    if (typeof object.timestamp !== "object")
                        throw TypeError(".rep.protos.Transaction.timestamp: object expected");
                    message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                }
                switch (object.confidentialityLevel) {
                case "LEVEL_UNDEFINED":
                case 0:
                    message.confidentialityLevel = 0;
                    break;
                case "PUBLIC":
                case 1:
                    message.confidentialityLevel = 1;
                    break;
                case "CONFIDENTIAL":
                case 2:
                    message.confidentialityLevel = 2;
                    break;
                }
                if (object.confidentialityProtocolVersion != null)
                    message.confidentialityProtocolVersion = String(object.confidentialityProtocolVersion);
                if (object.nonce != null)
                    if (typeof object.nonce === "string")
                        $util.base64.decode(object.nonce, message.nonce = $util.newBuffer($util.base64.length(object.nonce)), 0);
                    else if (object.nonce.length)
                        message.nonce = object.nonce;
                if (object.toValidators != null)
                    if (typeof object.toValidators === "string")
                        $util.base64.decode(object.toValidators, message.toValidators = $util.newBuffer($util.base64.length(object.toValidators)), 0);
                    else if (object.toValidators.length)
                        message.toValidators = object.toValidators;
                if (object.cert != null)
                    if (typeof object.cert === "string")
                        $util.base64.decode(object.cert, message.cert = $util.newBuffer($util.base64.length(object.cert)), 0);
                    else if (object.cert.length)
                        message.cert = object.cert;
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length)
                        message.signature = object.signature;
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
                    object.type = options.enums === String ? "UNDEFINED" : 0;
                    if (options.bytes === String)
                        object.chaincodeID = "";
                    else {
                        object.chaincodeID = [];
                        if (options.bytes !== Array)
                            object.chaincodeID = $util.newBuffer(object.chaincodeID);
                    }
                    object.payload = null;
                    if (options.bytes === String)
                        object.metadata = "";
                    else {
                        object.metadata = [];
                        if (options.bytes !== Array)
                            object.metadata = $util.newBuffer(object.metadata);
                    }
                    object.txid = "";
                    object.timestamp = null;
                    object.confidentialityLevel = options.enums === String ? "LEVEL_UNDEFINED" : 0;
                    object.confidentialityProtocolVersion = "";
                    if (options.bytes === String)
                        object.nonce = "";
                    else {
                        object.nonce = [];
                        if (options.bytes !== Array)
                            object.nonce = $util.newBuffer(object.nonce);
                    }
                    if (options.bytes === String)
                        object.toValidators = "";
                    else {
                        object.toValidators = [];
                        if (options.bytes !== Array)
                            object.toValidators = $util.newBuffer(object.toValidators);
                    }
                    if (options.bytes === String)
                        object.cert = "";
                    else {
                        object.cert = [];
                        if (options.bytes !== Array)
                            object.cert = $util.newBuffer(object.cert);
                    }
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.rep.protos.Transaction.Type[message.type] : message.type;
                if (message.chaincodeID != null && message.hasOwnProperty("chaincodeID"))
                    object.chaincodeID = options.bytes === String ? $util.base64.encode(message.chaincodeID, 0, message.chaincodeID.length) : options.bytes === Array ? Array.prototype.slice.call(message.chaincodeID) : message.chaincodeID;
                if (message.payload != null && message.hasOwnProperty("payload"))
                    object.payload = $root.rep.protos.ChaincodeSpec.toObject(message.payload, options);
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    object.metadata = options.bytes === String ? $util.base64.encode(message.metadata, 0, message.metadata.length) : options.bytes === Array ? Array.prototype.slice.call(message.metadata) : message.metadata;
                if (message.txid != null && message.hasOwnProperty("txid"))
                    object.txid = message.txid;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                if (message.confidentialityLevel != null && message.hasOwnProperty("confidentialityLevel"))
                    object.confidentialityLevel = options.enums === String ? $root.rep.protos.ConfidentialityLevel[message.confidentialityLevel] : message.confidentialityLevel;
                if (message.confidentialityProtocolVersion != null && message.hasOwnProperty("confidentialityProtocolVersion"))
                    object.confidentialityProtocolVersion = message.confidentialityProtocolVersion;
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    object.nonce = options.bytes === String ? $util.base64.encode(message.nonce, 0, message.nonce.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonce) : message.nonce;
                if (message.toValidators != null && message.hasOwnProperty("toValidators"))
                    object.toValidators = options.bytes === String ? $util.base64.encode(message.toValidators, 0, message.toValidators.length) : options.bytes === Array ? Array.prototype.slice.call(message.toValidators) : message.toValidators;
                if (message.cert != null && message.hasOwnProperty("cert"))
                    object.cert = options.bytes === String ? $util.base64.encode(message.cert, 0, message.cert.length) : options.bytes === Array ? Array.prototype.slice.call(message.cert) : message.cert;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
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
             * @property {number} CHAINCODE_QUERY=3 CHAINCODE_QUERY value
             * @property {number} CHAINCODE_TERMINATE=4 CHAINCODE_TERMINATE value
             */
            Transaction.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNDEFINED"] = 0;
                values[valuesById[1] = "CHAINCODE_DEPLOY"] = 1;
                values[valuesById[2] = "CHAINCODE_INVOKE"] = 2;
                values[valuesById[3] = "CHAINCODE_QUERY"] = 3;
                values[valuesById[4] = "CHAINCODE_TERMINATE"] = 4;
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
             * @property {google.protobuf.ITimestamp|null} [timestamp] Block timestamp
             * @property {Array.<rep.protos.ITransaction>|null} [transactions] Block transactions
             * @property {Uint8Array|null} [stateHash] Block stateHash
             * @property {Uint8Array|null} [previousBlockHash] Block previousBlockHash
             * @property {Array.<rep.protos.IEndorsement>|null} [consensusMetadata] Block consensusMetadata
             * @property {rep.protos.INonHashData|null} [nonHashData] Block nonHashData
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
                this.consensusMetadata = [];
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
             * Block timestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} timestamp
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.timestamp = null;

            /**
             * Block transactions.
             * @member {Array.<rep.protos.ITransaction>} transactions
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.transactions = $util.emptyArray;

            /**
             * Block stateHash.
             * @member {Uint8Array} stateHash
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.stateHash = $util.newBuffer([]);

            /**
             * Block previousBlockHash.
             * @member {Uint8Array} previousBlockHash
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.previousBlockHash = $util.newBuffer([]);

            /**
             * Block consensusMetadata.
             * @member {Array.<rep.protos.IEndorsement>} consensusMetadata
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.consensusMetadata = $util.emptyArray;

            /**
             * Block nonHashData.
             * @member {rep.protos.INonHashData|null|undefined} nonHashData
             * @memberof rep.protos.Block
             * @instance
             */
            Block.prototype.nonHashData = null;

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
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.transactions != null && message.transactions.length)
                    for (let i = 0; i < message.transactions.length; ++i)
                        $root.rep.protos.Transaction.encode(message.transactions[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.stateHash);
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.previousBlockHash);
                if (message.consensusMetadata != null && message.consensusMetadata.length)
                    for (let i = 0; i < message.consensusMetadata.length; ++i)
                        $root.rep.protos.Endorsement.encode(message.consensusMetadata[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.nonHashData != null && message.hasOwnProperty("nonHashData"))
                    $root.rep.protos.NonHashData.encode(message.nonHashData, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
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
                        message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.transactions && message.transactions.length))
                            message.transactions = [];
                        message.transactions.push($root.rep.protos.Transaction.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.stateHash = reader.bytes();
                        break;
                    case 5:
                        message.previousBlockHash = reader.bytes();
                        break;
                    case 6:
                        if (!(message.consensusMetadata && message.consensusMetadata.length))
                            message.consensusMetadata = [];
                        message.consensusMetadata.push($root.rep.protos.Endorsement.decode(reader, reader.uint32()));
                        break;
                    case 7:
                        message.nonHashData = $root.rep.protos.NonHashData.decode(reader, reader.uint32());
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
                if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                    if (error)
                        return "timestamp." + error;
                }
                if (message.transactions != null && message.hasOwnProperty("transactions")) {
                    if (!Array.isArray(message.transactions))
                        return "transactions: array expected";
                    for (let i = 0; i < message.transactions.length; ++i) {
                        let error = $root.rep.protos.Transaction.verify(message.transactions[i]);
                        if (error)
                            return "transactions." + error;
                    }
                }
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    if (!(message.stateHash && typeof message.stateHash.length === "number" || $util.isString(message.stateHash)))
                        return "stateHash: buffer expected";
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    if (!(message.previousBlockHash && typeof message.previousBlockHash.length === "number" || $util.isString(message.previousBlockHash)))
                        return "previousBlockHash: buffer expected";
                if (message.consensusMetadata != null && message.hasOwnProperty("consensusMetadata")) {
                    if (!Array.isArray(message.consensusMetadata))
                        return "consensusMetadata: array expected";
                    for (let i = 0; i < message.consensusMetadata.length; ++i) {
                        let error = $root.rep.protos.Endorsement.verify(message.consensusMetadata[i]);
                        if (error)
                            return "consensusMetadata." + error;
                    }
                }
                if (message.nonHashData != null && message.hasOwnProperty("nonHashData")) {
                    let error = $root.rep.protos.NonHashData.verify(message.nonHashData);
                    if (error)
                        return "nonHashData." + error;
                }
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
                if (object.timestamp != null) {
                    if (typeof object.timestamp !== "object")
                        throw TypeError(".rep.protos.Block.timestamp: object expected");
                    message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                }
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
                if (object.stateHash != null)
                    if (typeof object.stateHash === "string")
                        $util.base64.decode(object.stateHash, message.stateHash = $util.newBuffer($util.base64.length(object.stateHash)), 0);
                    else if (object.stateHash.length)
                        message.stateHash = object.stateHash;
                if (object.previousBlockHash != null)
                    if (typeof object.previousBlockHash === "string")
                        $util.base64.decode(object.previousBlockHash, message.previousBlockHash = $util.newBuffer($util.base64.length(object.previousBlockHash)), 0);
                    else if (object.previousBlockHash.length)
                        message.previousBlockHash = object.previousBlockHash;
                if (object.consensusMetadata) {
                    if (!Array.isArray(object.consensusMetadata))
                        throw TypeError(".rep.protos.Block.consensusMetadata: array expected");
                    message.consensusMetadata = [];
                    for (let i = 0; i < object.consensusMetadata.length; ++i) {
                        if (typeof object.consensusMetadata[i] !== "object")
                            throw TypeError(".rep.protos.Block.consensusMetadata: object expected");
                        message.consensusMetadata[i] = $root.rep.protos.Endorsement.fromObject(object.consensusMetadata[i]);
                    }
                }
                if (object.nonHashData != null) {
                    if (typeof object.nonHashData !== "object")
                        throw TypeError(".rep.protos.Block.nonHashData: object expected");
                    message.nonHashData = $root.rep.protos.NonHashData.fromObject(object.nonHashData);
                }
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
                    object.consensusMetadata = [];
                }
                if (options.defaults) {
                    object.version = 0;
                    object.timestamp = null;
                    if (options.bytes === String)
                        object.stateHash = "";
                    else {
                        object.stateHash = [];
                        if (options.bytes !== Array)
                            object.stateHash = $util.newBuffer(object.stateHash);
                    }
                    if (options.bytes === String)
                        object.previousBlockHash = "";
                    else {
                        object.previousBlockHash = [];
                        if (options.bytes !== Array)
                            object.previousBlockHash = $util.newBuffer(object.previousBlockHash);
                    }
                    object.nonHashData = null;
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                if (message.transactions && message.transactions.length) {
                    object.transactions = [];
                    for (let j = 0; j < message.transactions.length; ++j)
                        object.transactions[j] = $root.rep.protos.Transaction.toObject(message.transactions[j], options);
                }
                if (message.stateHash != null && message.hasOwnProperty("stateHash"))
                    object.stateHash = options.bytes === String ? $util.base64.encode(message.stateHash, 0, message.stateHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.stateHash) : message.stateHash;
                if (message.previousBlockHash != null && message.hasOwnProperty("previousBlockHash"))
                    object.previousBlockHash = options.bytes === String ? $util.base64.encode(message.previousBlockHash, 0, message.previousBlockHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.previousBlockHash) : message.previousBlockHash;
                if (message.consensusMetadata && message.consensusMetadata.length) {
                    object.consensusMetadata = [];
                    for (let j = 0; j < message.consensusMetadata.length; ++j)
                        object.consensusMetadata[j] = $root.rep.protos.Endorsement.toObject(message.consensusMetadata[j], options);
                }
                if (message.nonHashData != null && message.hasOwnProperty("nonHashData"))
                    object.nonHashData = $root.rep.protos.NonHashData.toObject(message.nonHashData, options);
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

        protos.NonHashData = (function() {

            /**
             * Properties of a NonHashData.
             * @memberof rep.protos
             * @interface INonHashData
             * @property {google.protobuf.ITimestamp|null} [localLedgerCommitTimestamp] NonHashData localLedgerCommitTimestamp
             * @property {Array.<rep.protos.ITransactionResult>|null} [transactionResults] NonHashData transactionResults
             */

            /**
             * Constructs a new NonHashData.
             * @memberof rep.protos
             * @classdesc Represents a NonHashData.
             * @implements INonHashData
             * @constructor
             * @param {rep.protos.INonHashData=} [properties] Properties to set
             */
            function NonHashData(properties) {
                this.transactionResults = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NonHashData localLedgerCommitTimestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} localLedgerCommitTimestamp
             * @memberof rep.protos.NonHashData
             * @instance
             */
            NonHashData.prototype.localLedgerCommitTimestamp = null;

            /**
             * NonHashData transactionResults.
             * @member {Array.<rep.protos.ITransactionResult>} transactionResults
             * @memberof rep.protos.NonHashData
             * @instance
             */
            NonHashData.prototype.transactionResults = $util.emptyArray;

            /**
             * Creates a new NonHashData instance using the specified properties.
             * @function create
             * @memberof rep.protos.NonHashData
             * @static
             * @param {rep.protos.INonHashData=} [properties] Properties to set
             * @returns {rep.protos.NonHashData} NonHashData instance
             */
            NonHashData.create = function create(properties) {
                return new NonHashData(properties);
            };

            /**
             * Encodes the specified NonHashData message. Does not implicitly {@link rep.protos.NonHashData.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.NonHashData
             * @static
             * @param {rep.protos.INonHashData} message NonHashData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NonHashData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.localLedgerCommitTimestamp != null && message.hasOwnProperty("localLedgerCommitTimestamp"))
                    $root.google.protobuf.Timestamp.encode(message.localLedgerCommitTimestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.transactionResults != null && message.transactionResults.length)
                    for (let i = 0; i < message.transactionResults.length; ++i)
                        $root.rep.protos.TransactionResult.encode(message.transactionResults[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified NonHashData message, length delimited. Does not implicitly {@link rep.protos.NonHashData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.NonHashData
             * @static
             * @param {rep.protos.INonHashData} message NonHashData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NonHashData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NonHashData message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.NonHashData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.NonHashData} NonHashData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NonHashData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.NonHashData();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.localLedgerCommitTimestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.transactionResults && message.transactionResults.length))
                            message.transactionResults = [];
                        message.transactionResults.push($root.rep.protos.TransactionResult.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NonHashData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.NonHashData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.NonHashData} NonHashData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NonHashData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NonHashData message.
             * @function verify
             * @memberof rep.protos.NonHashData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NonHashData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.localLedgerCommitTimestamp != null && message.hasOwnProperty("localLedgerCommitTimestamp")) {
                    let error = $root.google.protobuf.Timestamp.verify(message.localLedgerCommitTimestamp);
                    if (error)
                        return "localLedgerCommitTimestamp." + error;
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
                return null;
            };

            /**
             * Creates a NonHashData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.NonHashData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.NonHashData} NonHashData
             */
            NonHashData.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.NonHashData)
                    return object;
                let message = new $root.rep.protos.NonHashData();
                if (object.localLedgerCommitTimestamp != null) {
                    if (typeof object.localLedgerCommitTimestamp !== "object")
                        throw TypeError(".rep.protos.NonHashData.localLedgerCommitTimestamp: object expected");
                    message.localLedgerCommitTimestamp = $root.google.protobuf.Timestamp.fromObject(object.localLedgerCommitTimestamp);
                }
                if (object.transactionResults) {
                    if (!Array.isArray(object.transactionResults))
                        throw TypeError(".rep.protos.NonHashData.transactionResults: array expected");
                    message.transactionResults = [];
                    for (let i = 0; i < object.transactionResults.length; ++i) {
                        if (typeof object.transactionResults[i] !== "object")
                            throw TypeError(".rep.protos.NonHashData.transactionResults: object expected");
                        message.transactionResults[i] = $root.rep.protos.TransactionResult.fromObject(object.transactionResults[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a NonHashData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.NonHashData
             * @static
             * @param {rep.protos.NonHashData} message NonHashData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NonHashData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.transactionResults = [];
                if (options.defaults)
                    object.localLedgerCommitTimestamp = null;
                if (message.localLedgerCommitTimestamp != null && message.hasOwnProperty("localLedgerCommitTimestamp"))
                    object.localLedgerCommitTimestamp = $root.google.protobuf.Timestamp.toObject(message.localLedgerCommitTimestamp, options);
                if (message.transactionResults && message.transactionResults.length) {
                    object.transactionResults = [];
                    for (let j = 0; j < message.transactionResults.length; ++j)
                        object.transactionResults[j] = $root.rep.protos.TransactionResult.toObject(message.transactionResults[j], options);
                }
                return object;
            };

            /**
             * Converts this NonHashData to JSON.
             * @function toJSON
             * @memberof rep.protos.NonHashData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NonHashData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NonHashData;
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

        protos.TransactionResult = (function() {

            /**
             * Properties of a TransactionResult.
             * @memberof rep.protos
             * @interface ITransactionResult
             * @property {string|null} [txid] TransactionResult txid
             * @property {Array.<rep.protos.IOperLog>|null} [ol] TransactionResult ol
             * @property {number|null} [errorCode] TransactionResult errorCode
             * @property {string|null} [error] TransactionResult error
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
             * TransactionResult txid.
             * @member {string} txid
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.txid = "";

            /**
             * TransactionResult ol.
             * @member {Array.<rep.protos.IOperLog>} ol
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.ol = $util.emptyArray;

            /**
             * TransactionResult errorCode.
             * @member {number} errorCode
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.errorCode = 0;

            /**
             * TransactionResult error.
             * @member {string} error
             * @memberof rep.protos.TransactionResult
             * @instance
             */
            TransactionResult.prototype.error = "";

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
                if (message.txid != null && message.hasOwnProperty("txid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.txid);
                if (message.ol != null && message.ol.length)
                    for (let i = 0; i < message.ol.length; ++i)
                        $root.rep.protos.OperLog.encode(message.ol[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.errorCode);
                if (message.error != null && message.hasOwnProperty("error"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
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
                        message.txid = reader.string();
                        break;
                    case 2:
                        if (!(message.ol && message.ol.length))
                            message.ol = [];
                        message.ol.push($root.rep.protos.OperLog.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.errorCode = reader.uint32();
                        break;
                    case 4:
                        message.error = reader.string();
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
                if (message.txid != null && message.hasOwnProperty("txid"))
                    if (!$util.isString(message.txid))
                        return "txid: string expected";
                if (message.ol != null && message.hasOwnProperty("ol")) {
                    if (!Array.isArray(message.ol))
                        return "ol: array expected";
                    for (let i = 0; i < message.ol.length; ++i) {
                        let error = $root.rep.protos.OperLog.verify(message.ol[i]);
                        if (error)
                            return "ol." + error;
                    }
                }
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    if (!$util.isInteger(message.errorCode))
                        return "errorCode: integer expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
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
                if (object.txid != null)
                    message.txid = String(object.txid);
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
                if (object.errorCode != null)
                    message.errorCode = object.errorCode >>> 0;
                if (object.error != null)
                    message.error = String(object.error);
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
                    object.txid = "";
                    object.errorCode = 0;
                    object.error = "";
                }
                if (message.txid != null && message.hasOwnProperty("txid"))
                    object.txid = message.txid;
                if (message.ol && message.ol.length) {
                    object.ol = [];
                    for (let j = 0; j < message.ol.length; ++j)
                        object.ol[j] = $root.rep.protos.OperLog.toObject(message.ol[j], options);
                }
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    object.errorCode = message.errorCode;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
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

        protos.BlockChain = (function() {

            /**
             * Properties of a BlockChain.
             * @memberof rep.protos
             * @interface IBlockChain
             * @property {Array.<rep.protos.IBlock>|null} [block] BlockChain block
             */

            /**
             * Constructs a new BlockChain.
             * @memberof rep.protos
             * @classdesc Represents a BlockChain.
             * @implements IBlockChain
             * @constructor
             * @param {rep.protos.IBlockChain=} [properties] Properties to set
             */
            function BlockChain(properties) {
                this.block = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BlockChain block.
             * @member {Array.<rep.protos.IBlock>} block
             * @memberof rep.protos.BlockChain
             * @instance
             */
            BlockChain.prototype.block = $util.emptyArray;

            /**
             * Creates a new BlockChain instance using the specified properties.
             * @function create
             * @memberof rep.protos.BlockChain
             * @static
             * @param {rep.protos.IBlockChain=} [properties] Properties to set
             * @returns {rep.protos.BlockChain} BlockChain instance
             */
            BlockChain.create = function create(properties) {
                return new BlockChain(properties);
            };

            /**
             * Encodes the specified BlockChain message. Does not implicitly {@link rep.protos.BlockChain.verify|verify} messages.
             * @function encode
             * @memberof rep.protos.BlockChain
             * @static
             * @param {rep.protos.IBlockChain} message BlockChain message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BlockChain.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.block != null && message.block.length)
                    for (let i = 0; i < message.block.length; ++i)
                        $root.rep.protos.Block.encode(message.block[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified BlockChain message, length delimited. Does not implicitly {@link rep.protos.BlockChain.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rep.protos.BlockChain
             * @static
             * @param {rep.protos.IBlockChain} message BlockChain message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BlockChain.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BlockChain message from the specified reader or buffer.
             * @function decode
             * @memberof rep.protos.BlockChain
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rep.protos.BlockChain} BlockChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BlockChain.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rep.protos.BlockChain();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.block && message.block.length))
                            message.block = [];
                        message.block.push($root.rep.protos.Block.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BlockChain message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rep.protos.BlockChain
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rep.protos.BlockChain} BlockChain
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BlockChain.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BlockChain message.
             * @function verify
             * @memberof rep.protos.BlockChain
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BlockChain.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.block != null && message.hasOwnProperty("block")) {
                    if (!Array.isArray(message.block))
                        return "block: array expected";
                    for (let i = 0; i < message.block.length; ++i) {
                        let error = $root.rep.protos.Block.verify(message.block[i]);
                        if (error)
                            return "block." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a BlockChain message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rep.protos.BlockChain
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rep.protos.BlockChain} BlockChain
             */
            BlockChain.fromObject = function fromObject(object) {
                if (object instanceof $root.rep.protos.BlockChain)
                    return object;
                let message = new $root.rep.protos.BlockChain();
                if (object.block) {
                    if (!Array.isArray(object.block))
                        throw TypeError(".rep.protos.BlockChain.block: array expected");
                    message.block = [];
                    for (let i = 0; i < object.block.length; ++i) {
                        if (typeof object.block[i] !== "object")
                            throw TypeError(".rep.protos.BlockChain.block: object expected");
                        message.block[i] = $root.rep.protos.Block.fromObject(object.block[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a BlockChain message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rep.protos.BlockChain
             * @static
             * @param {rep.protos.BlockChain} message BlockChain
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BlockChain.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.block = [];
                if (message.block && message.block.length) {
                    object.block = [];
                    for (let j = 0; j < message.block.length; ++j)
                        object.block[j] = $root.rep.protos.Block.toObject(message.block[j], options);
                }
                return object;
            };

            /**
             * Converts this BlockChain to JSON.
             * @function toJSON
             * @memberof rep.protos.BlockChain
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BlockChain.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BlockChain;
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
             * @property {Uint8Array|null} [currentWorldStateHash] BlockchainInfo currentWorldStateHash
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
             * BlockchainInfo currentWorldStateHash.
             * @member {Uint8Array} currentWorldStateHash
             * @memberof rep.protos.BlockchainInfo
             * @instance
             */
            BlockchainInfo.prototype.currentWorldStateHash = $util.newBuffer([]);

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
                if (message.currentWorldStateHash != null && message.hasOwnProperty("currentWorldStateHash"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.currentWorldStateHash);
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
                        message.currentWorldStateHash = reader.bytes();
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
                if (message.currentWorldStateHash != null && message.hasOwnProperty("currentWorldStateHash"))
                    if (!(message.currentWorldStateHash && typeof message.currentWorldStateHash.length === "number" || $util.isString(message.currentWorldStateHash)))
                        return "currentWorldStateHash: buffer expected";
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
                if (object.currentWorldStateHash != null)
                    if (typeof object.currentWorldStateHash === "string")
                        $util.base64.decode(object.currentWorldStateHash, message.currentWorldStateHash = $util.newBuffer($util.base64.length(object.currentWorldStateHash)), 0);
                    else if (object.currentWorldStateHash.length)
                        message.currentWorldStateHash = object.currentWorldStateHash;
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
                        object.currentWorldStateHash = "";
                    else {
                        object.currentWorldStateHash = [];
                        if (options.bytes !== Array)
                            object.currentWorldStateHash = $util.newBuffer(object.currentWorldStateHash);
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
                if (message.currentWorldStateHash != null && message.hasOwnProperty("currentWorldStateHash"))
                    object.currentWorldStateHash = options.bytes === String ? $util.base64.encode(message.currentWorldStateHash, 0, message.currentWorldStateHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.currentWorldStateHash) : message.currentWorldStateHash;
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
