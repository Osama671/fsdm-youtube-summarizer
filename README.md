![Logo](./Readme%20Assets/logo-dark.png#gh-dark-mode-only) ![Logo](./Readme%20Assets/logo-light.png#gh-light-mode-only)

:sparkles: Frontend Web Development CSD 1103 – FSDM Group 2

> ## Live site:
>
> https://osama671.github.io/fsdm-youtube-summarizer/

# What is it?

Youtube Summarizer is the perfect solution when you want to watch a video without really watching it. Simply enter a youtube URL of your choice, click the magnifying glass and now the video has been perfectly summarized, saving you a lot of time to do other productive things, like watching youtube videos. This project is a collaborative effort by the students of Lambton College in Ontario, Mississauga, combining work from both the front-end and the back-end team forming the ultimate "Full-Stack Team". The main goal of this project is to save your time from long videos by obtaining the main points and crucial details quickly rather than watching the boring videos to figure them out. This is especially useful if you can’t focus on a video for a long, extended period of time, credit due to the insidious platforms of Tiktok and Youtube(shorts).

# How does it work?

The Youtube Video Summarizer employs state-of-the-art natural language processing (NLP) and machine learning algorithms to analyze the audio and the visual content of the video comprehensively. The summarizer also makes sure to extract the main points and relevant context of the video, in order to generate a text-based summary that encapsulates its essential aspects and provide a useful, informative and direct summary. Furthermore, this summarizer boasts a user-friendly and intuitive interface in order to ensure an effortless interaction for our users, to obtain summaries as fast as possible. All of this was possible thanks to using Pytube to download the video and then extract the audio file. Then, transcribe the audio into text using whisper, finally using T5 (HuggingFace) to summmarize the transcribed text.

## Site map

> ![sitemap](./Readme%20Assets/Sitemap-final.png)

## Wireframe

> Home Page ![Home](./Readme%20Assets/home.png)

> About Page ![About](./Readme%20Assets/About.png)

> Contributors Page ![Contributors](./Readme%20Assets/Contributors.png)

