# INF 554 Assignment 6

## Description

Using the data of Assignment 4, in an HTML document, load the data in `JSON` format, then using D3 data joins, present the data in as SVG table, scatterplot, bar chart and slope graph. All plots should use D3 scales and include axes, axes labels, tick marks, and tick mark labels as applicable. Demonstrate good development practices in README.md. Publish on your USC SCF account ([see instructions below](#usc-scf-publishing-instructions)) and add a link to the **published** page in `README.md`. All files, including `a6.html` should be stored in the repository. Describe the data and cite your source in `a6.html`.

## Rubric

| 	             | Table  | Scatterplot / Bar chart / Slope graph  | Development & Published Page |
| ------------- | ------ | -------------------------------------- | ---------------------------- |
| Sophisticated | Is well formatted and well presented, supports well visual comparison, uses D3 data join, data is well formatted, imported as JSON (4-5 pts) | Is well formatted, uses D3 data join, data is well formatted, imported as JSON, axes, axes labels, tick marks, and tick mark labels are well formatted, using scales appropriately (4-5 pts per chart) | Use of GIT is demonstrated. Set-up and deployment are documented. Page is well formatted with a proper layout and explanatory text (4-5 pts) | 
| Competent     | Is not well formatted, not well presented, support for visual comparison can be improved, improper use of D3 data join, data is not well formatted, not imported in JSON, axes, axes labels, tick marks, and tick mark labels are not well formatted (2-3 pts) | Chart not well formatted, improper use of D3 data join, data not well formatted, not imported as JSON, use of scales could be improved (2-3 pts per chart) | Use of GIT is not well demonstrated. Set-up and deployment are not well documented. Page is not well formatted and or not using proper layout and or no explanatory text is provided. (2-3 pts) |
| Needs work    | Is not formatted or not presented, do not support visual comparison, do not use D3 data join, data is not formatted, not imported as JSON (0-1 pts) | Is not formatted, do not use D3 data join, data is not formatted, not imported as JSON, axes, axes labels, tick marks, and tick mark labels are missing or not formatted, not using scales or improper use of scales (0-1 pts per chart) | Use of GIT is not demonstrated. Set-up and deployment are not documented. Page is not formatted, not using proper layout, no explanatory text is provided. (0-1 pts) |

### USC SCF Publishing Instructions

All USC students are eligible for UNIX Computing Accounts for Students (SCF) accounts. Students that need to access USC UNIX resources may do so using their Student Computing Facility (SCF) accounts. Located at `aludra.usc.edu` and `nunki.usc.edu`, these two servers act as time-sharing hosts for all student accounts. See the [SCF](https://itservices.usc.edu/scf/) page for more details.

You can publish your work in one of several ways:

- Remote login using [SSH](https://itservices.usc.edu/ssh) from a Unix-compatible terminal (On Windows, use [Putty](http://www.putty.org), also available on the [ITS software pages](https://itservices.usc.edu/software/)).
- Connect with [SFTP](https://itservices.usc.edu/sftp) (secure FTP) using a client such as [Filezilla](https://filezilla-project.org). ***Recommended for beginners***
- Use [MobaXterm](http://mobaxterm.mobatek.net/) (support both SSH and SFTP). 

There are three main steps no matter which software you use:

1. Make `public_html` directory (folder) if it does NOT exist
2. Copy your files into `public_html`.
3. Make `public_html` folder and files publicly readable. Check the page is accessible on your browser.

#### SSH Example

```{bash}
$ ssh <username>@aludra.usc.edu  # <username> is your USC username as it appears in your USC email address
$ mkdir public_html  # automatically mapped by Apache to http://www-scf.usc.edu/~username
# you will get an error in previous step if that directory already exists
$ cd public_html  # navigate inside public_html directory
$ cat > a6.html  # paste what follows into a6.html; when done pasting, type Ctrl+D to send EOF to close the file
<html>
   <head>
       <title>HTML Page Template</title>
   </head>
   <body>
       Hello!
   </body>
</html>
$ cat > <filename>  # repeat previous step for other files
$ cd ..  # navigate outside public_html directory
$ chmod -R 755 public_html  # make readable by www user for Apache to access 
```

The page will be visible at: `http://www-scf.usc.edu/~<username>/a6.html`

##### References

- [USC ITS UNIX Computing Accounts for Students (SCF)](https://itservices.usc.edu/scf/)
- [USC ITP Video: Connecting to the USC aludra server with an FTP program](https://www.youtube.com/watch?v=yfDDw4v0bzY)
- [Putty](http://www.putty.org)
- [Filezilla](https://filezilla-project.org)

## Homework Guidelines

- Homework repository must be updated before the start of next class
- Commits after the submission deadline will not be considered unless requested
- Late policy: 10% of total available points per each 24-hour late; duration less than 24 hours counts as a 24-hour period
- Homework is expected to work in: SAFARI AND CHROME (Mac), Edge AND CHROME (Windows)
