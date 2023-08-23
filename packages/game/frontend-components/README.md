# Game Frontend Components

This package defines solidjs components which are shared between frontend-web and frontend-mobile.

Because typescript can only make sense of one JSX type definition at a time, nativescript JSX is used by default, and web-based JSX components need to be in a separate file with `/* @jsxImportSource solid-js */` as the very first line.
