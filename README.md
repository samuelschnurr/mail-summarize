# Mail Summarize

[![Node CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/node.yml/badge.svg)](link)
[![.NET CI](https://github.com/samuelschnurr/mail-summarize/actions/workflows/dotnet.yml/badge.svg)](link)

Using artificial intelligence, your email is analyzed. After the content topic is identified, the mail is summarized into a length of 1-20 sentences defined by you. In addition, you will receive an assessment of the sentiment of the content.

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

To start, the repository should be opened with VSCode as workspace. The recommended extensions must then be installed. After this set up your projects in the following order below to get started. 

Mail Summarize is separated in three parts which are described in more detail under the links provided.

- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.infrastructure">Mail Summarize Azure Setup</a>: Infrastructure with Terraform v1
- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.api">Mail Summarize Api</a>: Frontend with React 16
- <a href="https://github.com/samuelschnurr/mail-summarize/tree/master/io.schnurr.summarize.web">Mail Summarize Add-In</a>: Backend with .NET 5


## License

This repository is under MIT license (see <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/LICENSE">LICENSE</a>).

Third party libraries are distributed under their own terms in the following license files:

- Backend Api: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.api/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
- Frontend Add-In: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.web/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
- Infrastructure: <a href="https://github.com/samuelschnurr/mail-summarize/blob/master/io.schnurr.summarize.infrastructure/LICENSE-3RD-PARTY">LICENSE-3RD-PARTY</a>
