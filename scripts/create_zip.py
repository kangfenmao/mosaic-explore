from pathlib import Path
from sys import argv
from zipfile import ZIP_STORED, ZipFile, ZipInfo


source = Path(argv[1]).resolve()
output = Path(argv[2]).resolve()
files = sorted(path for path in source.rglob("*") if path.is_file())

with ZipFile(output, "w") as archive:
    for file_path in files:
        relative = file_path.relative_to(source)
        if any(part.startswith(".") for part in relative.parts):
            continue
        if file_path.is_symlink():
            raise ValueError(f"Symbolic links are not allowed: {relative}")

        entry = ZipInfo(relative.as_posix(), date_time=(2020, 1, 1, 0, 0, 0))
        entry.compress_type = ZIP_STORED
        entry.external_attr = 0o100644 << 16
        archive.writestr(entry, file_path.read_bytes())
