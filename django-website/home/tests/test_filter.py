from home.templatetags.json_filter import json_dumps


def test_json_filter():
    json_data = {
        "field1": "field2",
    }
    text = json_dumps(json_data)
    assert '{"field1": "field2"}' == text
