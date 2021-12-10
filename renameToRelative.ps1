$rootPath = "src"
$absRoot = "app"

Get-ChildItem -Recurse $rootPath | Select-String "from '${absRoot}" -List | Select Path | ForEach-Object {

  $subPath = $_.Path.Substring($_.Path.IndexOf($rootPath) + $rootPath.Length)

  $filePath = $_.Path
  (Get-Content $filePath | ForEach-Object {
    if ($_ -match "import .*from '${absRoot}.*';")
    {
      $importStr = $_.Substring(0, $_.IndexOf("'"))
      $subStr = $_.Substring($_.IndexOf("'") + 1)

      # Find length of matching path (ignored)
      $compare1 = $subPath.Split("\")
      $compare2 = $subStr.Split("/")
      $matches = 0
      For ($i = 0; $i -lt $compare1.Length; $i++) {
        if ($compare2.Length -le $i -or $compare1[$i] -ne $compare2[$i]) {
          break
        }

        $matches += 1
      }

      # Replace remainder with ".."
      if ($compare1.Length -gt 2)
      {
        $backtrack = ,".." * $compare1[($matches)..($compare1.Length - 2)].Length
      }
      else
      {
        $backtract = ,"./"
      }

      # Combine backtracking path with remainder to create relative path
      $remainingPath = $compare2[($matches)..($compare2.Length - 1)]
      $relativePath = $backtrack + $remainingPath
      $relativePathStr = $importStr + "'" + ($relativePath -join "/")

      # Write-Host $subPath
      # Write-Host $subStr
      # Write-Host $relativePathStr
      return $relativePathStr
    }

    return $_
  }) | Set-Content $filePath
}
