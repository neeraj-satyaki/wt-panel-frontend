/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * WT PANEL
 * OpenAPI spec version: 1.0.0
 */
import { createInstance } from './api-instance'
import type { BodyType } from './api-instance'
export type PoddonsControllerGetOnePoddonParams = {
  id: string
  page: string
  count: string
}

export type CartControllerGetcartParams = {
  id: string
  page: string
  count: string
}

export type LocationsControllerGetCitiesByRegionParams = {
  id: string
}

export type LocationsControllerGetRegionsByCountryParams = {
  id: string
}

export type ImagesControllerGetStatustucsOfPhotosParams = {
  year: number
  month: number
}

export type ImagesControllerDeletImageParams = {
  productId: string
  image: string[]
}

export type ImagesControllerUploadImagesBody = {
  files?: Blob[]
  productId?: string
  userId?: string
  username?: string
}

export type ProductsControllerGetLostProductsParams = {
  page: string
  count: string
}

export type ProductsControllerAssignMainPhotoParams = {
  productId: string
  type: string
  imageUrl: string
}

export type ProductsControllerGetSimilarProductsParams = {
  q?: string
  addPart?: string
  page: string
  count: string
  pk?: number
}

export type ProductsControllerGetProductsParams = {
  q?: string
  addPart?: string
  page: string
  count: string
  pk?: number
}

export type PanelControllerGetCheckParams = {
  id: string
}

export type PanelControllerDeliveryInfoParams = {
  id: string
}

export type PanelControllerGetMissedCallsParams = {
  page: string
  count: string
}

export type PanelControllerGetReturnsParams = {
  page: string
  count: string
}

export type PanelControllerGetCancelsParams = {
  page: string
  count: string
}

export type PanelControllerGetApplicationSaleParams = {
  title: string
  type: string
  page: string
  count: string
  text: string
}

export type UsersControllerGetUserWorkTimeParams = {
  userId: string
  startDate: string
  endDate: string
}

export type UsersControllerGetAvatarByUserIdParams = {
  userId: string
}

export interface PoddonData {
  article: string
  comment: string
  cost: string
  indcode: string
  name: string
  photos: string[]
  pk: string
  place: string
  poddon: string
  sklad: string
}

export interface PoddonInfo {
  count: number
  ids: string[]
  pages: number
}

export interface ResPoddonDto {
  data: PoddonData[]
  info: PoddonInfo
}

export interface CartData {
  article: string
  comment: string
  cost: string
  indcode: string
  name: string
  photos: string[]
  pk: string
  place: string
  poddon: string
  sklad: string
}

export interface CartInfo {
  count: number
  ids: string[]
  pages: number
}

export interface ResCartDto {
  data: CartData[]
  info: CartInfo
}

export interface ResTransportCompanyDto {
  id: string
  name: string
}

export interface ResCountriesDto {
  id: string
  name: string
}

export interface Photographer {
  count: number
  name: string
  tabnum: string
}

export interface Day {
  date: string
  photographers: Photographer[]
}

export interface ResStatisticsOfPhotos {
  stat: Day[]
}

export interface CreateSaleDto {
  bill: string
  date: string
  id: string
  org: string
}

export interface SaleAddTrackNumberReq {
  saleId: string
  trackNumber: string
}

export interface SaleDto {
  article: string
  availability_in_k_warehouse: number
  code: string
  cost: string
  count: string
  id: string
  issued: string
  name: string
  photos: string[]
  place: string
  position: number
  state: string
  sum: string
}

export interface SaleResponseDto {
  data: SaleDto[]
  info: SaleInfo
}

export interface ApplicationDto {
  article: string
  availability_in_k_warehouse: number
  code: string
  cost: string
  count: string
  id: string
  issued: string
  name: string
  photos: string[]
  place: string
  position: string
  state: string
  sum: string
}

export interface ApplicationResponseDto {
  data: ApplicationDto[]
  info: ApplicationInfo
}

export interface Application {
  date: number
  id: string
}

export interface SaleInfo {
  application: Application
  client: number
  date: number
  id: string
  processing: string
  recorded_track_number: boolean
  responsible: string
  status: string
  store_keeper: string
  sub_processing: string
  sum: string
}

export interface ApplicationInfo {
  application: Application
  client: number
  date: number
  id: string
  numCheck: string
  porter: string
  processing: string
  responsible: string
  status: string
  store_keeper: string
  sub_processing: string
  sum: string
}

export interface ReqAddToZakazNaryad {
  orderId: string
  productId: string
}

export interface ReqSendToLost {
  ids: string[]
}

export interface ReqEditProduct {
  comment: string
  cost: number
  id: string
}

export interface ReqMovePallete {
  pallet: string
  place: string
}

export interface ReqMoveProduct {
  id: string
  place: string
  type: number
}

export interface ChangeProductInAppSale {
  id: string
  indCode: string
  pose: number
  type: string
}

export interface IssueProductInSaleReq {
  id: string
  pose: number
}

export interface ProductsTypesResponse {
  count: number
  id: number
  title: string
}

export interface ProductDto {
  article: string
  comment: string
  cost: string
  indcode: string
  name: string
  photos: string[]
  pk: boolean
  place: string
  poddon: string
  sklad: string
}

export interface ProductInfo {
  count: number
  pages: number
}

export interface ProductsResponse {
  data: ProductDto[]
  info: ProductInfo
}

export interface ReqCreateCheck {
  bill: string
  id: string
  org: string
}

export interface InvoiceItem {
  cost: string
  count: string
  name: string
  position: string
  sum: string
}

export interface InvoiceInfo {
  allsum: string
  bank: string
  bikbank: string
  buh: string
  buyer: string
  date: string
  director: string
  innorganization: string
  kpporganization: string
  num: string
  organization: string
  provider: string
  schetbank: string
  schetorganization: string
  sum: string
  withnds: string
}

export interface ResCheck {
  data: InvoiceItem[]
  info: InvoiceInfo
}

export interface DeliveryInfoAppSale {
  client: string
  date: string
  delivery_client: string
  delivery_status: string
  driver: string
  id: string
  inn: string
  name_or_name: string
  passport: string
  private: string
  receipt_city: string
  receipt_country: string
  receipt_region: string
  registration: string
  sending_city: string
  status: string
  statushistory: string
  sum: string
  tk: string
  weight: string
}

export interface DeliveryInfoRes {
  deliveryInfo: DeliveryInfoAppSale
  tkCities: TkCities
}

export interface Cities {
  id: string
  name: string
}

export interface Regions {
  id: string
  name: string
}

export interface Countries {
  id: string
  name: string
}

export interface Tks {
  id: string
  name: string
}

export interface TkCities {
  cities: Cities[]
  countries: Countries[]
  regions: Regions[]
  tks: Tks[]
}

export interface ReqRefusalDto {
  id: string
  reason: string
}

export interface Bill {
  id: string
  name: string
}

export interface Org {
  id: string
  name: string
}

export interface OrgsBills {
  bills: Bill[]
  orgs: Org[]
}

export interface MoveApplicationSaleDto {
  comment_for_collector: string
  id: string
  move_myself: boolean
  processing: string
  sub_processing: string
  type: string
}

export interface PorterDto {
  id: string
  name: string
  phone: string
}

export interface ResponsibleDto {
  id: string
  name: string
  phone: string
}

export interface DataDto {
  client: string
  flag: number
  id: string
  porter: PorterDto
  processing: string
  responsible: ResponsibleDto
  sub_processing: string
  tk: string
}

export interface InfoDto {
  count: number
  pages: number
}

export interface ApplicationSaleDto {
  data: DataDto[]
  info: InfoDto
}

export interface Category {
  count: number
  title: string
  type: string
}

export interface BadApplication {
  count: string
  state: string
}

export interface WorkTime {
  day: string
  endTime?: string
  startTime?: string
}

export interface WorkTimesInfo {
  absencesCount: number
  lateArrivalsCount: number
  overtimesCount: number
  totalWorkHours: number
  workDaysCount: number
  workTimes: WorkTime[]
}

export interface AvatarDto {
  avatar: string
}

export interface Role {
  id: string
  title: string
}

export interface SessionInfoDto {
  birth_date: string
  cart: string
  company: string
  id: string
  name: string
  personal_phone: string
  post: string
  roles: Role[]
  work_phone: string
}

export interface SignInRequestDto {
  password: string
  phone: string
}

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never

/**
 * @summary Авторизация при помощи 1C
 */
export const authControllerSignInOneC = (
  signInRequestDto: BodyType<SignInRequestDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in-one-c`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: signInRequestDto,
    },
    options,
  )
}

/**
 * @summary Выход из сессии
 */
export const authControllerSignOut = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>({ url: `/auth/sign-out`, method: 'post' }, options)
}

/**
 * @summary Получение информации о сессии
 */
export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SessionInfoDto>(
    { url: `/auth/session-info`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение фотографии пользователя
 */
export const usersControllerGetAvatarByUserId = (
  params: UsersControllerGetAvatarByUserIdParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<AvatarDto>(
    { url: `/users/avatar-by-user-id`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение информации о рабочем времени
 */
export const usersControllerGetUserWorkTime = (
  params: UsersControllerGetUserWorkTimeParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<WorkTimesInfo>(
    { url: `/users/work-time`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение информации о отказах, возвратах, и пропущенных звонках
 */
export const panelControllerGetBadApplications = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<BadApplication[]>(
    { url: `/panel/bad-applications`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение категорий
 */
export const panelControllerGetCategories = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<Category[]>({ url: `/panel/categories`, method: 'get' }, options)
}

/**
 * @summary Получение заявок и продаж
 */
export const panelControllerGetApplicationSale = (
  params: PanelControllerGetApplicationSaleParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ApplicationSaleDto>(
    { url: `/panel/applications-sales`, method: 'get', params },
    options,
  )
}

/**
 * @summary Перемещение заявок и продаж
 */
export const panelControllerMoveApplicationSale = (
  moveApplicationSaleDto: BodyType<MoveApplicationSaleDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/panel/move-application-sale`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: moveApplicationSaleDto,
    },
    options,
  )
}

/**
 * @summary Получение организация и счетов
 */
export const panelControllerGetOrgsBills = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<OrgsBills>(
    { url: `/panel/organizations-bills`, method: 'get' },
    options,
  )
}

/**
 * @summary Отказы
 */
export const panelControllerGetCancels = (
  params: PanelControllerGetCancelsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ApplicationSaleDto>(
    { url: `/panel/cancels`, method: 'get', params },
    options,
  )
}

/**
 * @summary Возвраты
 */
export const panelControllerGetReturns = (
  params: PanelControllerGetReturnsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<OrgsBills>(
    { url: `/panel/returns`, method: 'get', params },
    options,
  )
}

/**
 * @summary Пропущенные звонки
 */
export const panelControllerGetMissedCalls = (
  params: PanelControllerGetMissedCallsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<OrgsBills>(
    { url: `/panel/missed-calls`, method: 'get', params },
    options,
  )
}

/**
 * @summary Передать заявку в отказ
 */
export const panelControllerRefusalApplication = (
  reqRefusalDto: BodyType<ReqRefusalDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<OrgsBills>(
    {
      url: `/panel/refusal`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqRefusalDto,
    },
    options,
  )
}

/**
 * @summary Получить информацию о доставке
 */
export const panelControllerDeliveryInfo = (
  params: PanelControllerDeliveryInfoParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<DeliveryInfoRes>(
    { url: `/panel/delivery-info`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получить информацию о счёте
 */
export const panelControllerGetCheck = (
  params: PanelControllerGetCheckParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResCheck>(
    { url: `/panel/get-check`, method: 'get', params },
    options,
  )
}

/**
 * @summary Сформировать счёт
 */
export const panelControllerCreateCheck = (
  reqCreateCheck: BodyType<ReqCreateCheck>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/panel/create-check`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqCreateCheck,
    },
    options,
  )
}

/**
 * @summary Получение товаров по запросу
 */
export const productsControllerGetProducts = (
  params: ProductsControllerGetProductsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ProductsResponse>(
    { url: `/products`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение товара
 */
export const productsControllerGetProduct = (
  id: string,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ProductDto>(
    { url: `/products/one-product/${id}`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение типов продуктов
 */
export const productsControllerGetTypesProduct = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ProductsTypesResponse[]>(
    { url: `/products/type-products`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение похожих товаров
 */
export const productsControllerGetSimilarProducts = (
  params: ProductsControllerGetSimilarProductsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ProductsResponse>(
    { url: `/products/similar-products`, method: 'get', params },
    options,
  )
}

/**
 * @summary Выдача товара в продаже
 */
export const productsControllerIssueProduct = (
  issueProductInSaleReq: BodyType<IssueProductInSaleReq>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/issue-product-in-sale`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: issueProductInSaleReq,
    },
    options,
  )
}

/**
 * @summary Изменение товара в заявке или продаже
 */
export const productsControllerChangeProductInAppSale = (
  changeProductInAppSale: BodyType<ChangeProductInAppSale>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/change-product-in-app-sale`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: changeProductInAppSale,
    },
    options,
  )
}

/**
 * @summary Изменение места товара
 */
export const productsControllerMoveProduct = (
  reqMoveProduct: BodyType<ReqMoveProduct>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/move-product`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqMoveProduct,
    },
    options,
  )
}

/**
 * @summary Изменение места паллета
 */
export const productsControllerMovePallete = (
  reqMovePallete: BodyType<ReqMovePallete>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/move-pallete`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqMovePallete,
    },
    options,
  )
}

/**
 * @summary Назначить фотографию главной
 */
export const productsControllerAssignMainPhoto = (
  params: ProductsControllerAssignMainPhotoParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/products/assign-main-photo`, method: 'put', params },
    options,
  )
}

/**
 * @summary Изменение цены и комментарийя продукта
 */
export const productsControllerEditProduct = (
  reqEditProduct: BodyType<ReqEditProduct>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/edit`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqEditProduct,
    },
    options,
  )
}

/**
 * @summary Получение потерянных продуктов
 */
export const productsControllerGetLostProducts = (
  params: ProductsControllerGetLostProductsParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ProductsResponse>(
    { url: `/products/lost-products`, method: 'get', params },
    options,
  )
}

/**
 * @summary Перемещение массива товаров в список потерянных
 */
export const productsControllerRemoveToLost = (
  reqSendToLost: BodyType<ReqSendToLost>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/remove-to-lost`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqSendToLost,
    },
    options,
  )
}

/**
 * @summary Добавить товар в заказ наряд
 */
export const productsControllerAddProductToZakazNaryad = (
  reqAddToZakazNaryad: BodyType<ReqAddToZakazNaryad>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/products/add-product-to-zakaz-naryad`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: reqAddToZakazNaryad,
    },
    options,
  )
}

/**
 * @summary Получение заявки
 */
export const applicationsControllerGetApplication = (
  id: string,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ApplicationResponseDto>(
    { url: `/applications/${id}`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение продажи
 */
export const salesControllerGetSale = (
  id: string,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SaleResponseDto>({ url: `/sales/${id}`, method: 'get' }, options)
}

/**
 * @summary Добавить трек номер к продаже
 */
export const salesControllerAddTrackNumber = (
  saleAddTrackNumberReq: BodyType<SaleAddTrackNumberReq>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/sales/add-track-number`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: saleAddTrackNumberReq,
    },
    options,
  )
}

/**
 * @summary Создание продажи
 */
export const salesControllerCreateSale = (
  createSaleDto: BodyType<CreateSaleDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/sales/create-sale`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: createSaleDto,
    },
    options,
  )
}

export const imagesControllerUploadImages = (
  imagesControllerUploadImagesBody: BodyType<ImagesControllerUploadImagesBody>,
  options?: SecondParameter<typeof createInstance>,
) => {
  const formData = new FormData()
  if (imagesControllerUploadImagesBody.productId !== undefined) {
    formData.append('productId', imagesControllerUploadImagesBody.productId)
  }
  if (imagesControllerUploadImagesBody.userId !== undefined) {
    formData.append('userId', imagesControllerUploadImagesBody.userId)
  }
  if (imagesControllerUploadImagesBody.username !== undefined) {
    formData.append('username', imagesControllerUploadImagesBody.username)
  }
  if (imagesControllerUploadImagesBody.files !== undefined) {
    imagesControllerUploadImagesBody.files.forEach((value) =>
      formData.append('files', value),
    )
  }

  return createInstance<void>(
    {
      url: `/images`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    },
    options,
  )
}

export const imagesControllerDeletImage = (
  params: ImagesControllerDeletImageParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>({ url: `/images`, method: 'delete', params }, options)
}

/**
 * @summary Получение списка всех транспортных компаний
 */
export const imagesControllerGetStatustucsOfPhotos = (
  params: ImagesControllerGetStatustucsOfPhotosParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResStatisticsOfPhotos>(
    { url: `/images/statistics-of-photos`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение списка стран
 */
export const locationsControllerGetCountries = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResCountriesDto[]>(
    { url: `/locations/countries`, method: 'get' },
    options,
  )
}

/**
 * @summary Получение списка регионов для определённой страны
 */
export const locationsControllerGetRegionsByCountry = (
  params: LocationsControllerGetRegionsByCountryParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResCountriesDto[]>(
    { url: `/locations/region-by-country`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение списка городов для определённого региона
 */
export const locationsControllerGetCitiesByRegion = (
  params: LocationsControllerGetCitiesByRegionParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResCountriesDto[]>(
    { url: `/locations/cities-by-region`, method: 'get', params },
    options,
  )
}

/**
 * @summary Получение списка всех транспортных компаний
 */
export const transportCompanyControllerGetTransportCompanies = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResTransportCompanyDto[]>(
    { url: `/transport-company/all-transport-companies`, method: 'get' },
    options,
  )
}

export const cartControllerGetcart = (
  params: CartControllerGetcartParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResCartDto>(
    { url: `/cart/get-cart`, method: 'get', params },
    options,
  )
}

/**
 * @summary Информация о поддоне
 */
export const poddonsControllerGetOnePoddon = (
  params: PoddonsControllerGetOnePoddonParams,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ResPoddonDto>(
    { url: `/poddons/one-poddon`, method: 'get', params },
    options,
  )
}

export type AuthControllerSignInOneCResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignInOneC>>
>
export type AuthControllerSignOutResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignOut>>
>
export type AuthControllerGetSessionInfoResult = NonNullable<
  Awaited<ReturnType<typeof authControllerGetSessionInfo>>
>
export type UsersControllerGetAvatarByUserIdResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerGetAvatarByUserId>>
>
export type UsersControllerGetUserWorkTimeResult = NonNullable<
  Awaited<ReturnType<typeof usersControllerGetUserWorkTime>>
>
export type PanelControllerGetBadApplicationsResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetBadApplications>>
>
export type PanelControllerGetCategoriesResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetCategories>>
>
export type PanelControllerGetApplicationSaleResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetApplicationSale>>
>
export type PanelControllerMoveApplicationSaleResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerMoveApplicationSale>>
>
export type PanelControllerGetOrgsBillsResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetOrgsBills>>
>
export type PanelControllerGetCancelsResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetCancels>>
>
export type PanelControllerGetReturnsResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetReturns>>
>
export type PanelControllerGetMissedCallsResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetMissedCalls>>
>
export type PanelControllerRefusalApplicationResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerRefusalApplication>>
>
export type PanelControllerDeliveryInfoResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerDeliveryInfo>>
>
export type PanelControllerGetCheckResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerGetCheck>>
>
export type PanelControllerCreateCheckResult = NonNullable<
  Awaited<ReturnType<typeof panelControllerCreateCheck>>
>
export type ProductsControllerGetProductsResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerGetProducts>>
>
export type ProductsControllerGetProductResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerGetProduct>>
>
export type ProductsControllerGetTypesProductResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerGetTypesProduct>>
>
export type ProductsControllerGetSimilarProductsResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerGetSimilarProducts>>
>
export type ProductsControllerIssueProductResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerIssueProduct>>
>
export type ProductsControllerChangeProductInAppSaleResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerChangeProductInAppSale>>
>
export type ProductsControllerMoveProductResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerMoveProduct>>
>
export type ProductsControllerMovePalleteResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerMovePallete>>
>
export type ProductsControllerAssignMainPhotoResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerAssignMainPhoto>>
>
export type ProductsControllerEditProductResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerEditProduct>>
>
export type ProductsControllerGetLostProductsResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerGetLostProducts>>
>
export type ProductsControllerRemoveToLostResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerRemoveToLost>>
>
export type ProductsControllerAddProductToZakazNaryadResult = NonNullable<
  Awaited<ReturnType<typeof productsControllerAddProductToZakazNaryad>>
>
export type ApplicationsControllerGetApplicationResult = NonNullable<
  Awaited<ReturnType<typeof applicationsControllerGetApplication>>
>
export type SalesControllerGetSaleResult = NonNullable<
  Awaited<ReturnType<typeof salesControllerGetSale>>
>
export type SalesControllerAddTrackNumberResult = NonNullable<
  Awaited<ReturnType<typeof salesControllerAddTrackNumber>>
>
export type SalesControllerCreateSaleResult = NonNullable<
  Awaited<ReturnType<typeof salesControllerCreateSale>>
>
export type ImagesControllerUploadImagesResult = NonNullable<
  Awaited<ReturnType<typeof imagesControllerUploadImages>>
>
export type ImagesControllerDeletImageResult = NonNullable<
  Awaited<ReturnType<typeof imagesControllerDeletImage>>
>
export type ImagesControllerGetStatustucsOfPhotosResult = NonNullable<
  Awaited<ReturnType<typeof imagesControllerGetStatustucsOfPhotos>>
>
export type LocationsControllerGetCountriesResult = NonNullable<
  Awaited<ReturnType<typeof locationsControllerGetCountries>>
>
export type LocationsControllerGetRegionsByCountryResult = NonNullable<
  Awaited<ReturnType<typeof locationsControllerGetRegionsByCountry>>
>
export type LocationsControllerGetCitiesByRegionResult = NonNullable<
  Awaited<ReturnType<typeof locationsControllerGetCitiesByRegion>>
>
export type TransportCompanyControllerGetTransportCompaniesResult = NonNullable<
  Awaited<ReturnType<typeof transportCompanyControllerGetTransportCompanies>>
>
export type CartControllerGetcartResult = NonNullable<
  Awaited<ReturnType<typeof cartControllerGetcart>>
>
export type PoddonsControllerGetOnePoddonResult = NonNullable<
  Awaited<ReturnType<typeof poddonsControllerGetOnePoddon>>
>
