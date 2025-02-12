// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Contatti → Social*
 */
export interface ContattiDocumentDataSocialItem {
  /**
   * Link field in *Contatti → Social*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.social[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

type ContattiDocumentDataSlicesSlice = never;

/**
 * Content for Contatti documents
 */
interface ContattiDocumentData {
  /**
   * Testo_contatti field in *Contatti*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.testo_contatti
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  testo_contatti: prismic.RichTextField;

  /**
   * Social field in *Contatti*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.social[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  social: prismic.GroupField<Simplify<ContattiDocumentDataSocialItem>>;

  /**
   * Video field in *Contatti*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.video
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  video: prismic.LinkToMediaField<prismic.FieldState, never>;

  /**
   * Immagine  field in *Contatti*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.immagine
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;

  /**
   * Slice Zone field in *Contatti*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ContattiDocumentDataSlicesSlice> /**
   * Meta Title field in *Contatti*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: contatti.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Contatti*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: contatti.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Contatti*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: contatti.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Contatti document from Prismic
 *
 * - **API ID**: `contatti`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContattiDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<ContattiDocumentData>,
    "contatti",
    Lang
  >;

type HomepageDocumentDataSlicesSlice = SlideshowSlice;

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
  /**
   * Logo field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * Testo field in *Homepage*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.testo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  testo: prismic.RichTextField;

  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    "homepage",
    Lang
  >;

/**
 * Item in *Oggetto → Immagini*
 */
export interface OggettoDocumentDataImmaginiItem {
  /**
   * Immagine field in *Oggetto → Immagini*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.immagini[].immagine
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;
}

type OggettoDocumentDataSlicesSlice = never;

/**
 * Content for Oggetto documents
 */
interface OggettoDocumentData {
  /**
   * Data field in *Oggetto*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.data
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  data: prismic.DateField;

  /**
   * Cover 01 field in *Oggetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.cover_01
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  cover_01: prismic.ImageField<never>;

  /**
   * Cover 02 field in *Oggetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.cover_02
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  cover_02: prismic.ImageField<never>;

  /**
   * Didascalia field in *Oggetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.didascalia
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  didascalia: prismic.KeyTextField;

  /**
   * Descrizione field in *Oggetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.descrizione
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  descrizione: prismic.KeyTextField;

  /**
   * Immagini field in *Oggetto*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.immagini[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  immagini: prismic.GroupField<Simplify<OggettoDocumentDataImmaginiItem>>;

  /**
   * Slice Zone field in *Oggetto*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<OggettoDocumentDataSlicesSlice> /**
   * Meta Title field in *Oggetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: oggetto.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Oggetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: oggetto.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Oggetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: oggetto.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Oggetto document from Prismic
 *
 * - **API ID**: `oggetto`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type OggettoDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<OggettoDocumentData>,
    "oggetto",
    Lang
  >;

/**
 * Item in *Progetto → Immagini*
 */
export interface ProgettoDocumentDataImmaginiItem {
  /**
   * Immagine field in *Progetto → Immagini*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.immagini[].immagine
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;
}

type ProgettoDocumentDataSlicesSlice = never;

/**
 * Content for Progetto documents
 */
interface ProgettoDocumentData {
  /**
   * Data field in *Progetto*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.data
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  data: prismic.DateField;

  /**
   * Cover 01 field in *Progetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.cover
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  cover: prismic.ImageField<never>;

  /**
   * Cover 02 field in *Progetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.cover_02
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  cover_02: prismic.ImageField<never>;

  /**
   * Didascalia field in *Progetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.didascalia
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  didascalia: prismic.KeyTextField;

  /**
   * Descrizione Progetto field in *Progetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.descrizione_progetto
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  descrizione_progetto: prismic.KeyTextField;

  /**
   * Immagini field in *Progetto*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.immagini[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  immagini: prismic.GroupField<Simplify<ProgettoDocumentDataImmaginiItem>>;

  /**
   * Slice Zone field in *Progetto*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ProgettoDocumentDataSlicesSlice> /**
   * Meta Title field in *Progetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: progetto.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Progetto*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: progetto.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Progetto*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: progetto.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Progetto document from Prismic
 *
 * - **API ID**: `progetto`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProgettoDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ProgettoDocumentData>,
    "progetto",
    Lang
  >;

/**
 * Item in *Servizi → Servizi*
 */
export interface ServiziDocumentDataServiziItem {
  /**
   * Servizio field in *Servizi → Servizi*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.servizi[].servizio
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  servizio: prismic.KeyTextField;

  /**
   * Descrizione field in *Servizi → Servizi*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.servizi[].descrizione
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  descrizione: prismic.RichTextField;

  /**
   * Immagine field in *Servizi → Servizi*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.servizi[].immagine
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;

  /**
   * Video field in *Servizi → Servizi*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.servizi[].video
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  video: prismic.LinkToMediaField<prismic.FieldState, never>;
}

type ServiziDocumentDataSlicesSlice = never;

/**
 * Content for Servizi documents
 */
interface ServiziDocumentData {
  /**
   * Servizi field in *Servizi*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.servizi[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  servizi: prismic.GroupField<Simplify<ServiziDocumentDataServiziItem>>;

  /**
   * Slice Zone field in *Servizi*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ServiziDocumentDataSlicesSlice> /**
   * Meta Title field in *Servizi*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: servizi.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Servizi*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: servizi.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Servizi*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: servizi.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Servizi document from Prismic
 *
 * - **API ID**: `servizi`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ServiziDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<ServiziDocumentData>,
    "servizi",
    Lang
  >;

/**
 * Item in *Settings → header*
 */
export interface SettingsDocumentDataHeaderItem {
  /**
   * Link field in *Settings → header*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.header[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.Repeatable<
    prismic.LinkField<string, string, unknown, prismic.FieldState, never>
  >;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * meta title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_title
   * - **Tab**: SEO
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;

  /**
   * meta description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: SEO
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * meta image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_image
   * - **Tab**: SEO
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never> /**
   * header field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.header[]
   * - **Tab**: HEADER
   * - **Documentation**: https://prismic.io/docs/field#group
   */;
  header: prismic.GroupField<Simplify<SettingsDocumentDataHeaderItem>> /**
   * testo field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.testo
   * - **Tab**: PRELOADER
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  testo: prismic.KeyTextField;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

type StoriaDocumentDataSlicesSlice = never;

/**
 * Content for Storia documents
 */
interface StoriaDocumentData {
  /**
   * Testo field in *Storia*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: storia.testo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  testo: prismic.RichTextField;

  /**
   * Immagine field in *Storia*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: storia.immagine
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;

  /**
   * Slice Zone field in *Storia*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: storia.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<StoriaDocumentDataSlicesSlice> /**
   * Meta Title field in *Storia*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: storia.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Storia*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: storia.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Storia*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: storia.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Storia document from Prismic
 *
 * - **API ID**: `storia`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type StoriaDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<StoriaDocumentData>,
    "storia",
    Lang
  >;

export type AllDocumentTypes =
  | ContattiDocument
  | HomepageDocument
  | OggettoDocument
  | ProgettoDocument
  | ServiziDocument
  | SettingsDocument
  | StoriaDocument;

/**
 * Item in *Slideshow → Default → Primary → Slideshow*
 */
export interface SlideshowSliceDefaultPrimarySlideshowItem {
  /**
   * Immagine field in *Slideshow → Default → Primary → Slideshow*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: slideshow.default.primary.slideshow[].immagine
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine: prismic.ImageField<never>;

  /**
   * Immagine mobile field in *Slideshow → Default → Primary → Slideshow*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: slideshow.default.primary.slideshow[].immagine_mobile
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  immagine_mobile: prismic.ImageField<never>;

  /**
   * Video field in *Slideshow → Default → Primary → Slideshow*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: slideshow.default.primary.slideshow[].video
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  video: prismic.LinkToMediaField<prismic.FieldState, never>;
}

/**
 * Primary content in *Slideshow → Default → Primary*
 */
export interface SlideshowSliceDefaultPrimary {
  /**
   * Slideshow field in *Slideshow → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: slideshow.default.primary.slideshow[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  slideshow: prismic.GroupField<
    Simplify<SlideshowSliceDefaultPrimarySlideshowItem>
  >;
}

/**
 * Default variation for Slideshow Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SlideshowSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SlideshowSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Slideshow*
 */
type SlideshowSliceVariation = SlideshowSliceDefault;

/**
 * Slideshow Shared Slice
 *
 * - **API ID**: `slideshow`
 * - **Description**: Slideshow
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SlideshowSlice = prismic.SharedSlice<
  "slideshow",
  SlideshowSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      ContattiDocument,
      ContattiDocumentData,
      ContattiDocumentDataSocialItem,
      ContattiDocumentDataSlicesSlice,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      OggettoDocument,
      OggettoDocumentData,
      OggettoDocumentDataImmaginiItem,
      OggettoDocumentDataSlicesSlice,
      ProgettoDocument,
      ProgettoDocumentData,
      ProgettoDocumentDataImmaginiItem,
      ProgettoDocumentDataSlicesSlice,
      ServiziDocument,
      ServiziDocumentData,
      ServiziDocumentDataServiziItem,
      ServiziDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataHeaderItem,
      StoriaDocument,
      StoriaDocumentData,
      StoriaDocumentDataSlicesSlice,
      AllDocumentTypes,
      SlideshowSlice,
      SlideshowSliceDefaultPrimarySlideshowItem,
      SlideshowSliceDefaultPrimary,
      SlideshowSliceVariation,
      SlideshowSliceDefault,
    };
  }
}
