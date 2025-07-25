
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.15.0
 * Query Engine version: 12e25d8d06f6ea5a0252864dd9a03b1bb51f3022
 */
Prisma.prismaVersion = {
  client: "5.15.0",
  engine: "12e25d8d06f6ea5a0252864dd9a03b1bb51f3022"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Audit_log_entriesScalarFieldEnum = {
  instance_id: 'instance_id',
  id: 'id',
  payload: 'payload',
  created_at: 'created_at',
  ip_address: 'ip_address'
};

exports.Prisma.Flow_stateScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  auth_code: 'auth_code',
  code_challenge_method: 'code_challenge_method',
  code_challenge: 'code_challenge',
  provider_type: 'provider_type',
  provider_access_token: 'provider_access_token',
  provider_refresh_token: 'provider_refresh_token',
  created_at: 'created_at',
  updated_at: 'updated_at',
  authentication_method: 'authentication_method',
  auth_code_issued_at: 'auth_code_issued_at'
};

exports.Prisma.IdentitiesScalarFieldEnum = {
  provider_id: 'provider_id',
  user_id: 'user_id',
  identity_data: 'identity_data',
  provider: 'provider',
  last_sign_in_at: 'last_sign_in_at',
  created_at: 'created_at',
  updated_at: 'updated_at',
  email: 'email',
  id: 'id'
};

exports.Prisma.InstancesScalarFieldEnum = {
  id: 'id',
  uuid: 'uuid',
  raw_base_config: 'raw_base_config',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Mfa_amr_claimsScalarFieldEnum = {
  session_id: 'session_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  authentication_method: 'authentication_method',
  id: 'id'
};

exports.Prisma.Mfa_challengesScalarFieldEnum = {
  id: 'id',
  factor_id: 'factor_id',
  created_at: 'created_at',
  verified_at: 'verified_at',
  ip_address: 'ip_address',
  otp_code: 'otp_code',
  web_authn_session_data: 'web_authn_session_data'
};

exports.Prisma.Mfa_factorsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  friendly_name: 'friendly_name',
  factor_type: 'factor_type',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  secret: 'secret',
  phone: 'phone',
  last_challenged_at: 'last_challenged_at',
  web_authn_credential: 'web_authn_credential',
  web_authn_aaguid: 'web_authn_aaguid'
};

exports.Prisma.One_time_tokensScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  token_type: 'token_type',
  token_hash: 'token_hash',
  relates_to: 'relates_to',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Refresh_tokensScalarFieldEnum = {
  instance_id: 'instance_id',
  id: 'id',
  token: 'token',
  user_id: 'user_id',
  revoked: 'revoked',
  created_at: 'created_at',
  updated_at: 'updated_at',
  parent: 'parent',
  session_id: 'session_id'
};

exports.Prisma.Saml_providersScalarFieldEnum = {
  id: 'id',
  sso_provider_id: 'sso_provider_id',
  entity_id: 'entity_id',
  metadata_xml: 'metadata_xml',
  metadata_url: 'metadata_url',
  attribute_mapping: 'attribute_mapping',
  created_at: 'created_at',
  updated_at: 'updated_at',
  name_id_format: 'name_id_format'
};

exports.Prisma.Saml_relay_statesScalarFieldEnum = {
  id: 'id',
  sso_provider_id: 'sso_provider_id',
  request_id: 'request_id',
  for_email: 'for_email',
  redirect_to: 'redirect_to',
  created_at: 'created_at',
  updated_at: 'updated_at',
  flow_state_id: 'flow_state_id'
};

exports.Prisma.Schema_migrationsScalarFieldEnum = {
  version: 'version'
};

exports.Prisma.SessionsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  factor_id: 'factor_id',
  aal: 'aal',
  not_after: 'not_after',
  refreshed_at: 'refreshed_at',
  user_agent: 'user_agent',
  ip: 'ip',
  tag: 'tag'
};

exports.Prisma.Sso_domainsScalarFieldEnum = {
  id: 'id',
  sso_provider_id: 'sso_provider_id',
  domain: 'domain',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sso_providersScalarFieldEnum = {
  id: 'id',
  resource_id: 'resource_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.UsersScalarFieldEnum = {
  instance_id: 'instance_id',
  id: 'id',
  aud: 'aud',
  role: 'role',
  email: 'email',
  encrypted_password: 'encrypted_password',
  email_confirmed_at: 'email_confirmed_at',
  invited_at: 'invited_at',
  confirmation_token: 'confirmation_token',
  confirmation_sent_at: 'confirmation_sent_at',
  recovery_token: 'recovery_token',
  recovery_sent_at: 'recovery_sent_at',
  email_change_token_new: 'email_change_token_new',
  email_change: 'email_change',
  email_change_sent_at: 'email_change_sent_at',
  last_sign_in_at: 'last_sign_in_at',
  raw_app_meta_data: 'raw_app_meta_data',
  raw_user_meta_data: 'raw_user_meta_data',
  is_super_admin: 'is_super_admin',
  created_at: 'created_at',
  updated_at: 'updated_at',
  phone: 'phone',
  phone_confirmed_at: 'phone_confirmed_at',
  phone_change: 'phone_change',
  phone_change_token: 'phone_change_token',
  phone_change_sent_at: 'phone_change_sent_at',
  confirmed_at: 'confirmed_at',
  email_change_token_current: 'email_change_token_current',
  email_change_confirm_status: 'email_change_confirm_status',
  banned_until: 'banned_until',
  reauthentication_token: 'reauthentication_token',
  reauthentication_sent_at: 'reauthentication_sent_at',
  is_sso_user: 'is_sso_user',
  deleted_at: 'deleted_at',
  is_anonymous: 'is_anonymous'
};

exports.Prisma.BooksScalarFieldEnum = {
  created_at: 'created_at',
  title: 'title',
  description: 'description',
  image: 'image',
  chapters: 'chapters',
  id: 'id'
};

exports.Prisma.DictionaryScalarFieldEnum = {
  word: 'word',
  level: 'level',
  created_at: 'created_at',
  id: 'id'
};

exports.Prisma.ProfilesScalarFieldEnum = {
  id: 'id',
  updated_at: 'updated_at',
  nickname: 'nickname',
  image: 'image',
  role: 'role'
};

exports.Prisma.UsersbooksScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  user: 'user',
  book: 'book',
  is_book_marked: 'is_book_marked',
  last_page: 'last_page'
};

exports.Prisma.UsersvocabScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  user: 'user',
  status: 'status',
  repeatments: 'repeatments',
  term: 'term'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.code_challenge_method = exports.$Enums.code_challenge_method = {
  s256: 's256',
  plain: 'plain'
};

exports.factor_type = exports.$Enums.factor_type = {
  totp: 'totp',
  webauthn: 'webauthn',
  phone: 'phone'
};

exports.factor_status = exports.$Enums.factor_status = {
  unverified: 'unverified',
  verified: 'verified'
};

exports.one_time_token_type = exports.$Enums.one_time_token_type = {
  confirmation_token: 'confirmation_token',
  reauthentication_token: 'reauthentication_token',
  recovery_token: 'recovery_token',
  email_change_token_new: 'email_change_token_new',
  email_change_token_current: 'email_change_token_current',
  phone_change_token: 'phone_change_token'
};

exports.aal_level = exports.$Enums.aal_level = {
  aal1: 'aal1',
  aal2: 'aal2',
  aal3: 'aal3'
};

exports.roles = exports.$Enums.roles = {
  user: 'user',
  admin: 'admin'
};

exports.word_statuses = exports.$Enums.word_statuses = {
  unknown: 'unknown',
  learned: 'learned',
  learning: 'learning',
  upto: 'upto'
};

exports.Prisma.ModelName = {
  audit_log_entries: 'audit_log_entries',
  flow_state: 'flow_state',
  identities: 'identities',
  instances: 'instances',
  mfa_amr_claims: 'mfa_amr_claims',
  mfa_challenges: 'mfa_challenges',
  mfa_factors: 'mfa_factors',
  one_time_tokens: 'one_time_tokens',
  refresh_tokens: 'refresh_tokens',
  saml_providers: 'saml_providers',
  saml_relay_states: 'saml_relay_states',
  schema_migrations: 'schema_migrations',
  sessions: 'sessions',
  sso_domains: 'sso_domains',
  sso_providers: 'sso_providers',
  users: 'users',
  books: 'books',
  dictionary: 'dictionary',
  profiles: 'profiles',
  usersbooks: 'usersbooks',
  usersvocab: 'usersvocab'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
