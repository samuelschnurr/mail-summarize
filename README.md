# Mail Summarize

[![Node CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/node.yml/badge.svg)](link)
[![.NET CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/dotnet.yml/badge.svg)](link)

Using the artificial intelligence of azure cognitive services and text analytics, your email is analyzed. After the content topic is identified, the mail is summarized into a length of 1-20 sentences defined by you. In addition, you will receive an assessment of the sentiment of the content.

The following languages are supported:
- Chinese (simplified)
- German
- English
- French
- Italian
- Japanese
- Korean
- Portugese
- Spanish

## Documentation

To start, the repository should be opened as workspace with VSCode. The recommended extensions must then be installed. After this do the project setup in the subsequent order to get started. 

Mail Summarize is separated in three parts which are described in more detail under the links provided.

- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.infrastructure">Azure Infrastructure</a>: Infrastructure with Terraform v1
- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.api">Azure Function</a>: Backend with .NET 5
- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.web">Outlook Add-In</a>: Frontend with React 16

## Demonstration

### Summarize Mails

<img alt="Image of a long outlook mail which is summarized in the taskpane add-in beside." src="https://github.com/samuelschnurr/mail-summarize/blob/master/docs/LongMail-WithLayout.png" width="100%" height="100%" />

### Summarize Discussion

<img alt="Image of a outlook mail with many responses which is summarized in the taskpane add-in beside." src="https://github.com/samuelschnurr/mail-summarize/blob/master/docs/DiscussionMail-WithLayout.png" width="100%" height="100%" />

### Recognize Sentiment

<img alt="Image of a outlook mail whose sentiment is recognized in the taskpane add-in beside." src="https://github.com/samuelschnurr/mail-summarize/blob/master/docs/SentimentMail-WithLayout.png" width="100%" height="100%" />

## License

This repository is under MIT license (see <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/LICENSE">LICENSE</a>).

Third party libraries are distributed under their own terms in the following license files:

- Azure Infrastructure: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.infrastructure/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
- Azure Function: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.api/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
- Outlook Add-In: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.web/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
