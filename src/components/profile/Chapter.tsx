import React from 'react';
import { ChapterProps } from '../Types';

const Chapter: React.FC<ChapterProps> = ({ name }: ChapterProps) => <li>{name}</li>;

export default Chapter;
