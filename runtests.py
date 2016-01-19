#!/usr/bin/env python
import os
import sys
import pytest


# add here your folders to the PYTHONPATH
sys.path.append(os.path.join(os.path.dirname(__file__), "django-website"))

# sys.exit() is required otherwise the wrapper exits
# with exit code 0, regardless the pytest.main() execution
sys.exit(pytest.main())
